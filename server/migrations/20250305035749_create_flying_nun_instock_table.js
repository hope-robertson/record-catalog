exports.up = function (knex) {
  return knex.schema.createTable('flying_nun_instock', function (table) {
    table.increments('id').primary()
    table.string('barcode')
    table.string('code')
    table.string('title')
    table.string('artist')
    table.decimal('price_excl_gst')
    table.boolean('selected')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('flying_nun_instock')
}
