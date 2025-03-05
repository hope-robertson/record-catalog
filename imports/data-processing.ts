// lib/data-processing.ts

// Interfaces for Flying Nun
export interface FlyingNunRawRecord {
  Barcode: string
  Code: string
  'Title/Artist': string
  'Price Excl GST': string
  SELECTED: string
}

export interface FlyingNunFormattedRecord {
  barcode: string
  code: string
  title: string
  artist: string
  price_excl_gst: number
  selected: boolean
}

// Interfaces for Southbound
export interface SouthboundRawRecord {
  'Cat No': string
  'Artist/Title': string
  Price: string
  Format: string
  CODE: string
  'ROUGH COST': string
  SELECTED: string
}

export interface SouthboundFormattedRecord {
  cat_no: string
  artist: string
  title: string
  price: number
  format: string
  code: string
  rough_cost: number
  selected: boolean
}

export interface BorderRawRecord {
  Artist: string
  Title: string
  Code: string
  Barcode: string
  Format: string
  Price: string
  'APPROX RETAIL': string
  SELECTED: string
}

export interface BorderFormattedRecord {
  artist: string
  title: string
  code: string
  barcode: string
  format: string
  price: number
  approx_retail: number
  selected: boolean
}

export interface CollectiveRawRecord {
  ARTIST: string
  'Cat No': string
  Barcode: string
  FORMAT: string
  PRICE: string
  SELECTED: string
  'ORDER?': string
}

export interface CollectiveFormattedRecord {
  artist: string
  cat_no: string
  barcode: string
  format: string
  price: number
  selected: boolean
  order: boolean
}

export interface RhythmethodRawRecord {
  'TICK THIS ONE ❤': string
  Code: string
  'Artist/Title': string
  Barcode: string
  Price: string
  Available: string
  SELECTED: string
  'PICK?': string
}

export interface RhythmethodFormattedRecord {
  tick_this_one: boolean
  code: string
  artist: string
  title: string
  barcode: string
  price: number
  available: string
  selected: boolean
  pick: boolean
}

export interface SonyRawRecord {
  'TICK THIS ONE ❤': string
  Code: string
  Description: string
  Barcode: string
  Price: string
  Available: string
  SELECTED: string
  'PICK?': string
}

export interface SonyFormattedRecord {
  tick_this_one: boolean
  code: string
  artist: string
  title: string
  barcode: string
  price: number
  available: number
  selected: boolean
  pick: boolean
}

export interface WarnerRawRecord {
  Code: string
  Description: string
  Barcode: string
  Price: string
  Available: string
  SELECTED: string
  'PICK?': string
}

export interface WarnerFormattedRecord {
  code: string
  artist: string
  title: string
  barcode: string
  price: number
  available: number
  selected: boolean
  pick: boolean
}

export interface JunoRawRecord {
  ARTIST: string
  TITLE: string
  'JUNO ID': string
  LABEL: string
  'CAT NO': string
  BARCODE: string
  MEDIUM: string
  DESCRIPTION: string
  GENRE: string
  COST: string
  'QTY IN STOCK': string
  'EST. $NZD COST+SHIP': string
  RETAIL: string
  'GET?': string
}

export interface JunoFormattedRecord {
  artist: string
  title: string
  juno_id: string
  label: string
  cat_no: string
  barcode: string
  medium: string
  description: string
  genre: string
  cost: number
  qty_in_stock: number
  est_nzd_cost_ship: number
  retail: number
  get: boolean
}

// Data processing functions
export const processFlyingNunRecord = (
  record: FlyingNunRawRecord
): FormattedRecord => {
  const titleArtist = record['Title/Artist']
  let artist = ''
  let title = ''

  if (titleArtist.includes(' - ')) {
    const parts = titleArtist.split(' - ')
    artist = parts[0]
    title = parts[1]
  } else {
    title = titleArtist
  }

  return {
    barcode: record.Barcode,
    code: record.Code,
    title: title,
    artist: artist,
    price_excl_gst: parseFloat(record['Price Excl GST'].replace('$', '')),
    selected: record.SELECTED === 'TRUE',
  }
}

export const processSouthboundRecord = (
  record: SouthboundRawRecord
): SouthboundFormattedRecord => {
  const titleArtist = record['Artist/Title']
  let artist = ''
  let title = ''

  if (titleArtist.includes(' - ')) {
    const parts = titleArtist.split(' - ')
    artist = parts[0]
    title = parts[1]
  } else {
    title = titleArtist
  }

  return {
    cat_no: record['Cat No'],
    artist: artist,
    title: title,
    price: parseFloat(record.Price.replace('$', '')),
    format: record.Format,
    code: record.CODE,
    rough_cost: parseFloat(record['ROUGH COST']),
    selected: record.SELECTED === 'TRUE',
  }
}

export const processBorderRecord = (
  record: BorderRawRecord
): BorderFormattedRecord => {
  return {
    artist: record.Artist,
    title: record.Title,
    code: record.Code,
    barcode: record.Barcode,
    format: record.Format,
    price: parseFloat(record.Price.replace('$', '')),
    approx_retail: parseFloat(record['APPROX RETAIL'].replace('$', '')),
    selected: record.SELECTED === 'TRUE',
  }
}

export const processCollectiveRecord = (
  record: CollectiveRawRecord
): CollectiveFormattedRecord => {
  return {
    artist: record.ARTIST,
    cat_no: record['Cat No'],
    barcode: record.Barcode,
    format: record.FORMAT,
    price: parseFloat(record.PRICE.replace('$', '')),
    selected: record.SELECTED === 'TRUE',
    order: record['ORDER?'] === 'TRUE',
  }
}

export const processRhythmethodRecord = (
  record: RhythmethodRawRecord
): RhythmethodFormattedRecord => {
  const titleArtist = record['Artist/Title']
  let artist = ''
  let title = ''

  if (titleArtist.includes(' - ')) {
    const parts = titleArtist.split(' - ')
    artist = parts[0]
    title = parts[1]
  } else {
    title = titleArtist
  }

  return {
    tick_this_one: record['TICK THIS ONE ❤'] === 'TRUE',
    code: record.Code,
    artist: artist,
    title: title,
    barcode: record.Barcode,
    price: parseFloat(record.Price.replace('$', '').replace(',', '')),
    available: record.Available,
    selected: record.SELECTED === 'TRUE',
    pick: record['PICK?'] === 'TRUE',
  }
}

export const processSonyRecord = (
  record: SonyRawRecord
): SonyFormattedRecord => {
  const description = record.Description
  let artist = ''
  let title = ''

  if (description.includes(' - ')) {
    const parts = description.split(' - ')
    artist = parts[0]
    title = parts[1]
  } else {
    title = description
  }

  return {
    tick_this_one: record['TICK THIS ONE ❤'] === 'TRUE',
    code: record.Code,
    artist: artist,
    title: title,
    barcode: record.Barcode,
    price: parseFloat(record.Price.replace('$', '').replace(',', '')),
    available: parseInt(record.Available),
    selected: record.SELECTED === 'TRUE',
    pick: record['PICK?'] === 'TRUE',
  }
}

export const processWarnerRecord = (
  record: WarnerRawRecord
): WarnerFormattedRecord => {
  const description = record.Description
  let artist = ''
  let title = ''

  if (description.includes(' - ')) {
    const parts = description.split(' - ')
    artist = parts[0]
    title = parts[1]
  } else {
    title = description
  }

  return {
    code: record.Code,
    artist: artist,
    title: title,
    barcode: record.Barcode,
    price: parseFloat(record.Price.replace('$', '').replace(',', '')),
    available: parseInt(record.Available),
    selected: record.SELECTED === 'TRUE',
    pick: record['PICK?'] === 'TRUE',
  }
}

export const processJunoRecord = (
  record: JunoRawRecord
): JunoFormattedRecord => {
  return {
    artist: record.ARTIST,
    title: record.TITLE,
    juno_id: record['JUNO ID'],
    label: record.LABEL,
    cat_no: record['CAT NO'],
    barcode: record.BARCODE,
    medium: record.MEDIUM,
    description: record.DESCRIPTION,
    genre: record.GENRE,
    cost: parseFloat(record.COST.replace('£', '')),
    qty_in_stock: parseInt(record['QTY IN STOCK']),
    est_nzd_cost_ship: parseFloat(
      record['EST. $NZD COST+SHIP'].replace('$', '')
    ),
    retail: parseFloat(record.RETAIL.replace('$', '')),
    get: record['GET?'] === 'TRUE',
  }
}

// Add other data processing functions here for other distributors, etc.
