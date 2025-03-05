// imports/import_sony.ts

import knex from 'knex'
import xlsx from 'xlsx'
import {
  processSonyRecord,
  SonyFormattedRecord,
  SonyRawRecord,
} from '../lib/data-processing'
import knexConfig from '../knexfile'

const db = knex(knexConfig.development)

async function importData(filePath: string): Promise<void> {
  try {
    const workbook = xlsx.readFile(filePath)
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const records: SonyRawRecord[] = xlsx.utils.sheet_to_json(worksheet)
    const formattedRecords: SonyFormattedRecord[] =
      records.map(processSonyRecord)

    await db('sony_instock').insert(formattedRecords)
    console.log('Sony data imported successfully.')
  } catch (error) {
    console.error('Error importing Sony data:', error)
  }
}

// Example usage:
importData('sony_data.xlsx')
