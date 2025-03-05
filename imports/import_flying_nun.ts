// imports/import_flying_nun.ts

import knex from 'knex'
import xlsx from 'xlsx'
import {
  processFlyingNunRecord,
  FormattedRecord,
  FlyingNunRawRecord,
} from '../imports/data-processing' // Import from the module
import knexConfig from '../knexfile'

const db = knex(knexConfig.development)

async function importData(filePath: string): Promise<void> {
  try {
    const workbook = xlsx.readFile(filePath)
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const records: FlyingNunRawRecord[] = xlsx.utils.sheet_to_json(worksheet)
    const formattedRecords: FormattedRecord[] = records.map(
      processFlyingNunRecord
    )

    await db('flying_nun_instock').insert(formattedRecords)
    console.log('Flying Nun data imported successfully.')
  } catch (error) {
    console.error('Error importing Flying Nun data:', error)
  }
}

// Example usage:
importData('flying_nun_data.xlsx')
