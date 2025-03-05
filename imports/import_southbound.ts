// imports/import_southbound.ts

import knex from 'knex'
import xlsx from 'xlsx'
import {
  processSouthboundRecord,
  SouthboundFormattedRecord,
  SouthboundRawRecord,
} from '../lib/data-processing' // Correct import
import knexConfig from '../knexfile'

const db = knex(knexConfig.development)

async function importData(filePath: string): Promise<void> {
  try {
    const workbook = xlsx.readFile(filePath)
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const records: SouthboundRawRecord[] = xlsx.utils.sheet_to_json(worksheet)
    const formattedRecords: SouthboundFormattedRecord[] = records.map(
      processSouthboundRecord // Correct function
    )

    await db('southbound_instock').insert(formattedRecords)
    console.log('Southbound data imported successfully.')
  } catch (error) {
    console.error('Error importing Southbound data:', error)
  }
}

// Example usage:
// importData('southbound_data.xlsx')
