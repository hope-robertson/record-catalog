// migrations/<timestamp>_create_collective_instock_table.js
exports.up = function (knex) {
  return knex.schema.createTable('collective_instock', function (table) {
    table.increments('id').primary()
    table.string('artist')
    table.string('cat_no')
    table.string('barcode')
    table.string('format')
    table.decimal('price')
    table.boolean('selected')
    table.boolean('order')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('collective_instock')
}
