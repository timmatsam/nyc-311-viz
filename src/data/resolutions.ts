export function resolveShorthand(desc: string): string {
  if (desc.includes('made an arrest')) return 'Arrest Made'
  if (desc.includes('issued a summons')) return 'Summons Issued'
  if (desc.includes('took action to fix')) return 'Action Taken'
  if (desc.includes('were gone')) return 'Gone on Arrival'
  if (desc.includes('no evidence')) return 'No Evidence Found'
  if (desc.includes('action was not necessary')) return 'No Action Needed'
  if (desc.includes('condition was corrected')) return 'Corrected, No Summons'
  if (desc.includes('no criminal violation')) return 'No Violation Observed'
  if (desc.includes('does not fall under')) return 'Not NYPD Jurisdiction'
  if (desc.includes('unable to gain entry')) return 'No Entry'
  if (desc.includes('report was prepared')) return 'Report Filed'
  if (desc.includes('requested a tow truck')) return 'Vehicle Towed'
  if (desc.includes('another specific tow is required')) return 'Tow Required'
  if (desc.includes('tow request was not necessary')) return 'Tow Not Needed'
  if (desc.includes('referred to the Department of Homeless')) return 'Referred to DHS'
  if (desc.includes('long-term investigation')) return 'Under Investigation'
  if (desc.includes('additional information will be available later')) return 'Pending Info'
  if (desc.includes('insufficient contact')) return 'Insufficient Info'
  if (desc.includes('provided additional information')) return 'Info Provided'
  return desc
}

export const RESOLUTION_LEGEND: { shorthand: string; summary: string; original: string }[] = [
  {
    shorthand: 'Action Taken',
    summary: 'Police responded and fixed the condition.',
    original: 'The Police Department responded to the complaint and took action to fix the condition.',
  },
  {
    shorthand: 'Gone on Arrival',
    summary: 'The person/vehicle responsible was gone when police arrived.',
    original: 'The Police Department responded and upon arrival those responsible for the condition were gone.',
  },
  {
    shorthand: 'Summons Issued',
    summary: 'Police issued a parking summons (ticket).',
    original: 'The Police Department issued a summons in response to the complaint.',
  },
  {
    shorthand: 'No Evidence Found',
    summary: 'Police found no evidence of a violation upon arrival.',
    original: 'The Police Department responded to the complaint and with the information available observed no evidence of the violation at that time.',
  },
  {
    shorthand: 'No Action Needed',
    summary: 'Police determined no action was necessary.',
    original: 'The Police Department responded to the complaint and determined that police action was not necessary.',
  },
  {
    shorthand: 'Info Provided',
    summary: 'Police reviewed the complaint and provided additional info.',
    original: 'The Police Department reviewed your complaint and provided additional information below.',
  },
  {
    shorthand: 'No Violation Observed',
    summary: 'Police observed no criminal violation upon arrival.',
    original: 'The New York City Police Department responded to the complaint and observed no criminal violation upon their arrival.',
  },
  {
    shorthand: 'Corrected, No Summons',
    summary: 'The condition was corrected without issuing a summons or arrest.',
    original: 'The New York City Police Department responded to the complaint and their investigation determined that no criminal violation existed. The condition was corrected without the need to issue a summons or effect an arrest.',
  },
  {
    shorthand: 'Not NYPD Jurisdiction',
    summary: 'The complaint falls outside NYPD jurisdiction.',
    original: 'This complaint does not fall under the Police Department\'s jurisdiction.',
  },
  {
    shorthand: 'Report Filed',
    summary: 'Police responded and prepared a report.',
    original: 'The Police Department responded to the complaint and a report was prepared.',
  },
  {
    shorthand: 'No Entry',
    summary: 'Officers were unable to gain entry to the premises.',
    original: 'The Police Department responded to the complaint but officers were unable to gain entry into the premises.',
  },
  {
    shorthand: 'Arrest Made',
    summary: 'Police made an arrest in response to the complaint.',
    original: 'The Police Department made an arrest in response to the complaint.',
  },
  {
    shorthand: 'Tow Required',
    summary: 'Investigation determined another specific tow is required.',
    original: 'The New York City Police Department responded to the complaint and their investigation determined another specific tow is required. Please contact the local precinct for more information.',
  },
  {
    shorthand: 'Tow Not Needed',
    summary: 'Police determined a tow was not necessary.',
    original: 'The New York City Police Department responded to the complaint and their investigation determined that a tow request was not necessary.',
  },
  {
    shorthand: 'Vehicle Towed',
    summary: 'Police requested a tow truck to remove the vehicle.',
    original: 'The New York City Police Department responded to the complaint and requested a tow truck to remove the noted vehicle.',
  },
  {
    shorthand: 'Under Investigation',
    summary: 'A long-term investigation may be necessary.',
    original: 'Your complaint has been received by the Police Department and it has been determined that a long-term investigation may be necessary. Additional information will be available at the conclusion of the investigation.',
  },
  {
    shorthand: 'Pending Info',
    summary: 'Complaint received; additional information coming later.',
    original: 'Your complaint has been received by the Police Department and additional information will be available later.',
  },
  {
    shorthand: 'Insufficient Info',
    summary: 'Request could not be processed due to missing contact info.',
    original: 'Your request can not be processed at this time because of insufficient contact information. Please create a new Service Request on NYC.gov and provide more detailed contact information.',
  },
  {
    shorthand: 'Referred to DHS',
    summary: 'An encampment was found; referred to Dept. of Homeless Services.',
    original: 'The New York City Police Department responded to the complaint and observed an encampment at the noted location. The complaint has been referred to the Department of Homeless Services (DHS) for further action.',
  },
]
