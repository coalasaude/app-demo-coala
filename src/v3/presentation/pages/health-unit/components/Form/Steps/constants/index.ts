export const steps: Record<string, { next: string; back: string }> = {
  unit: { next: 'operation', back: '' },
  operation: { next: 'financial', back: 'unit' },
  financial: { next: 'services', back: 'operation' },
  services: { next: 'links', back: 'financial' },
  links: { next: '', back: 'services' },
}

export enum EditSections {
  ADMINISTRATIVE = 'administrative',
  CONTACTS = 'contacts',
  ADDRESS = 'address',
  FINANCIAL = 'financial',
  OPERATION = 'operation',
  SERVICES = 'services',
  LINK = 'link',
  SETTINGS = 'settings',
}
