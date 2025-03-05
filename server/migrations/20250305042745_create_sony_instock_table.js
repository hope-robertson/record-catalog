// migrations/<timestamp>_create_sony_instock_table.js
exports.up = function (knex) {
  return knex.schema.createTable('sony_instock', function (table) {
    table.increments('id').primary()
    table.string('code')
    table.string('artist')
    table.string('title')
    table.string('barcode')
    table.decimal('price')
    table.integer('available')
    table.boolean('selected')
    table.boolean('pick')
    table.boolean('tick_this_one')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('sony_instock')
}
