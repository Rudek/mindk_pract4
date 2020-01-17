const Database = use('Database');

class Product {
  static get userFields() {
    return ['id', 'username'];
  }

  static async getProductById(id) {
    const product = await this.query()
      .with('user', builder => builder.setVisible(Product.userFields))
      .with('attrs', builder => {
        builder
          .innerJoin('attributes', 'attributes.id', 'product_attributes.attribute_id')
          .setHidden(['attribute_id', 'product_id', 'category_id']);
      })
      .where('id', id)
      .firstOrFail();
    return product;
  }

  static async filterProducts({ categ, name, user, order = 'id', sort = 'asc' }) {
    const products = await this.query()
      .with('user', builder => builder.setVisible(Product.userFields))
      .where(() => {
        if (categ) {
          this.where('category_id', categ);
        }
        if (name) {
          this.where('name', 'ilike', `%${name}%`);
        }
        if (user) {
          this.where('user_id', user);
        }
      })
      .orderBy(order, sort)
      .fetch();
    return products;
  }

  static async saveProduct(prod, attrs) {
    const trx = await Database.beginTransaction();
    try {
      const product = await this.create(prod, trx);
      await product.attrs().createMany(
        attrs.map(attr => ({
          attribute_id: attr.attribute_id,
          value: attr.value
        })),
        trx
      );
      await trx.commit();
      return product;
    } catch (e) {
      await trx.rollback();
      throw e;
    }
  }

  static async updateProduct(id, prod, attrs) {
    const trx = await Database.beginTransaction();
    try {
      const product = await this.findOrFail(id);
      product.merge(prod);
      await product.save(trx);
      await Promise.all(
        attrs.map(attr =>
          product
            .attrs()
            .where('attribute_id', attr.attribute_id)
            .update({ value: attr.value }, trx)
        )
      );
      trx.commit();
      return product;
    } catch (e) {
      await trx.rollback();
      throw e;
    }
  }
}

module.exports = Product;
