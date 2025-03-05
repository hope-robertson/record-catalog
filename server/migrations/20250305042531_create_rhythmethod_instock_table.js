// migrations/<timestamp>_create_rhythmethod_instock_table.js
exports.up = function (knex) {
  return knex.schema.createTable('rhythmethod_instock', function (table) {
    table.increments('id').primary()
    table.string('code')
    table.string('artist')
    table.string('title')
    table.string('barcode')
    table.decimal('price')
    table.string('available')
    table.boolean('selected')
    table.boolean('pick')
    table.boolean('tick_this_one')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('rhythmethod_instock')
}
