// migrations/<timestamp>_create_southbound_instock_table.js
exports.up = function (knex) {
  return knex.schema.createTable('southbound_instock', function (table) {
    table.increments('id').primary()
    table.string('cat_no')
    table.string('artist')
    table.string('title')
    table.decimal('price')
    table.string('format')
    table.string('code')
    table.decimal('rough_cost')
    table.boolean('selected')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('southbound_instock')
}
