// imports/import_border.ts

import knex from 'knex'
import xlsx from 'xlsx'
import {
  processBorderRecord,
  BorderFormattedRecord,
  BorderRawRecord,
} from '../lib/data-processing'
import knexConfig from '../knexfile'

const db = knex(knexConfig.development)

async function importData(filePath: string): Promise<void> {
  try {
    const workbook = xlsx.readFile(filePath)
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const records: BorderRawRecord[] = xlsx.utils.sheet_to_json(worksheet)
    const formattedRecords: BorderFormattedRecord[] =
      records.map(processBorderRecord)

    await db('border_instock').insert(formattedRecords)
    console.log('Border data imported successfully.')
  } catch (error) {
    console.error('Error importing Border data:', error)
  }
}

// Example usage:
// importData('border_data.xlsx');
