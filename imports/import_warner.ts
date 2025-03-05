// imports/import_warner.ts

import knex from 'knex'
import xlsx from 'xlsx'
import {
  processWarnerRecord,
  WarnerFormattedRecord,
  WarnerRawRecord,
} from '../lib/data-processing'
import knexConfig from '../knexfile'

const db = knex(knexConfig.development)

async function importData(filePath: string): Promise<void> {
  try {
    const workbook = xlsx.readFile(filePath)
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const records: WarnerRawRecord[] = xlsx.utils.sheet_to_json(worksheet)
    const formattedRecords: WarnerFormattedRecord[] =
      records.map(processWarnerRecord)

    await db('warner_instock').insert(formattedRecords)
    console.log('Warner data imported successfully.')
  } catch (error) {
    console.error('Error importing Warner data:', error)
  }
}

// Example usage:
importData('warner_data.xlsx')
