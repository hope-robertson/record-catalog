// migrations/<timestamp>_create_juno_instock_table.js
exports.up = function (knex) {
  return knex.schema.createTable('juno_instock', function (table) {
    table.increments('id').primary()
    table.string('artist')
    table.string('title')
    table.string('juno_id')
    table.string('label')
    table.string('cat_no')
    table.string('barcode')
    table.string('medium')
    table.string('description')
    table.string('genre')
    table.decimal('cost')
    table.integer('qty_in_stock')
    table.decimal('est_nzd_cost_ship')
    table.decimal('retail')
    table.boolean('get')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('juno_instock')
}
