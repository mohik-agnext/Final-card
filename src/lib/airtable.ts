import Airtable from 'airtable';

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(
  process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID as string
);

export interface ManagerData {
  name: string;
  imageUrl: string;
}

export async function getManagerData(name: string): Promise<ManagerData | null> {
  try {
    console.log('API Key:', process.env.NEXT_PUBLIC_AIRTABLE_API_KEY ? 'Present' : 'Missing');
    console.log('Base ID:', process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID ? 'Present' : 'Missing');
    console.log('Searching for manager:', name);
    
    // Create the formula with exact match
    const formula = `LOWER({Name}) = LOWER('${name.trim()}')`;
    console.log('Search formula:', formula);
    
    const records = await base('User Photos')  // Update this to match your table name
      .select({
        filterByFormula: formula,
        maxRecords: 1
      })
      .firstPage();

    console.log('Number of records found:', records.length);
    
    if (records.length > 0) {
      const record = records[0];
      console.log('Record fields:', record.fields);
      
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