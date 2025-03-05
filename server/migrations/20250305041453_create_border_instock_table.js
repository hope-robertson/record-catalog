// migrations/<timestamp>_create_border_instock_table.js
exports.up = function (knex) {
  return knex.schema.createTable('border_instock', function (table) {
    table.increments('id').primary()
    table.string('artist')
    table.string('title')
    table.string('code')
    table.string('barcode')
    table.string('format')
    table.decimal('price')
    table.decimal('approx_retail')
    table.boolean('selected')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('border_instock')
}
