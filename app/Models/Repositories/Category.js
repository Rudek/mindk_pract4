const Database = use('Database');

class Category {
  static async getCategAttrsById(id) {
    const categories = await this.query()
      .with('attrs', builder => {
        builder.setHidden(['category_id']);
      })
      .where('id', id)
      .firstOrFail();
    return categories;
  }

  static async saveCategAttrs(name, attrs) {
    const trx = await Database.beginTransaction();
    try {
      const category = await this.create({ name }, trx);
      const attributes = attrs.map(attr => ({ name: attr }));
      await category.attrs().createMany(attributes, trx);
      await trx.commit();
      return category;
    } catch (e) {
      await trx.rollback();
      throw e;
    }
  }

  static async updateCategAttrs(id, name, attrs) {
    const trx = await Database.beginTransaction();
    try {
      const category = await this.findOrFail(id);
      category.merge({ name });
      await category.save(trx);
      const attributes = await category.attrs().ids();
      await Promise.all(
        attrs.map(attr => {
          if (!attr.id || attributes.indexOf(attr.id) === -1) {
            attr.id = undefined;
            return category.attrs().create({ name: attr.name }, trx);
          }
          return category
            .attrs()
            .where('id', attr.id)
            .update({ name: attr.name }, trx);
        })
      );
      await trx.commit();
      return category;
    } catch (e) {
      await trx.rollback();
      throw e;
    }
  }
}

module.exports = Category;
