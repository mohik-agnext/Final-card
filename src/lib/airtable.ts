import Airtable from 'airtable';

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(
  process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID as string
);

export interface ManagerData {
  name: string;
  imageUrl: string;
}

export async function getAllManagerNames(): Promise<string[]> {
  try {
    const records = await base('User Photos')
      .select({
        fields: ['Name'],
        sort: [{ field: 'Name', direction: 'asc' }]
      })
      .firstPage();

    console.log(`Found ${records.length} manager records`);
    
    // Extract and deduplicate manager names
    const names = records.map(record => record.get('Name') as string)
      .filter(name => name && name.trim().length > 0);
    
    // Remove duplicates
    const uniqueNames = Array.from(new Set(names));
    console.log(`Extracted ${uniqueNames.length} unique manager names`);
    
    return uniqueNames;
  } catch (error) {
    console.error('Error fetching manager names:', error);
    return [];
  }
}

export async function getManagerData(name: string): Promise<ManagerData | null> {
  try {
    console.log('API Key:', process.env.NEXT_PUBLIC_AIRTABLE_API_KEY ? 'Present' : 'Missing');
    console.log('Base ID:', process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID ? 'Present' : 'Missing');
    console.log('Searching for manager:', name);
    
    if (!name.trim()) {
      console.log('Empty name provided, skipping search');
      return null;
    }
    
    // Create a more flexible formula that uses FIND() to do a case-insensitive contains search
    // This will match both exact names and partial names
    const searchName = name.trim().replace(/'/g, "\\'"); // Escape single quotes
    const formula = `OR(
      LOWER({Name}) = LOWER('${searchName}'),
      FIND(LOWER('${searchName}'), LOWER({Name})) > 0
    )`;
    console.log('Search formula:', formula);
    
    const records = await base('User Photos')
      .select({
        filterByFormula: formula,
        maxRecords: 5 // Increased to allow for multiple matches
      })
      .firstPage();

    console.log('Number of records found:', records.length);
    
    if (records.length > 0) {
      // If multiple records found, try to find an exact match first (case-insensitive)
      let record = records.find(r => 
        (r.get('Name') as string).toLowerCase() === name.toLowerCase()
      );
      
      // If no exact match, use the first record
      if (!record) {
        record = records[0];
      }
      
      console.log('Selected record:', record.fields);
      
      const photo = record.get('Photo');
      console.log('Photo field value:', photo);

      if (Array.isArray(photo) && photo.length > 0) {
        const imageUrl = photo[0].url;
        console.log('Found image URL:', imageUrl);
        
        return {
          name: record.get('Name') as string,
          imageUrl: imageUrl
        };
      } else {
        console.log('No photo attachments found in the record');
      }
    } else {
      console.log('No matching records found for name:', name);
    }
    return null;
  } catch (error) {
    console.error('Error fetching manager data:', error);
    throw error; // Let's throw the error to see it in the frontend
  }
} 