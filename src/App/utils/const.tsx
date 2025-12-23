export interface userInterface {
  auth?: boolean;
  name?: string;
  userID?: string;
  loggedPopup?: boolean;
  offPopup?: boolean;
  createPopup?: boolean;
  addPopup?: boolean;
}

export interface offerInterface {
  _id: string;
  agreements: string;
  city: string;
  company: string;
  companyIndustry: string;
  companySize: string;
  coordinates: [{ lat: number; lng: number }];
  currency: string;
  description: string;
  email: string;
  employment: string;
  experience: string;
  logo: string | undefined;
  maxSalary: number;
  minSalary: number;
  street: string;
  techStack: [{ language: string; lvl: number }];
  technology: [
    { color: string; background: string; img: string; name: string },
  ];
  title: string;
  userID: string;
  website: string;
}

export interface formInterface {
  _id?: string;
  agreements?: string;
  city?: string;
  company?: string;
  companyIndustry?: string;
  companySize?: string;
  coordinates?: [{ lat: number; lng: number }];
  currency?: string;
  description?: string;
  email?: string;
  employment?: string;
  experience?: string;
  logo?: string | undefined;
  maxSalary?: number;
  minSalary?: number;
  street?: string;
  techStack: { language?: string; lvl?: number }[];
  technology?: [
    { color: string; background: string; img: string; name: string },
  ];
  title?: string;
  userID: string;
  website?: string;
}

export interface applicationInterface {
  checkbox: boolean;
  email: string;
  file: string;
  message: string;
  name: string;
  offerID: string;
}

export interface filtersInterface {
  city: string;
  language: string;
  experience: string;
  salarymax: number;
  salarymin: number;
}

export interface matchInterface {
  city: string;
  language: string;
  experience: string;
  salarymax: string;
  salarymin: string;
}

export interface formValuesCV {
  name: string;
  email: string;
  message: string;
  checkbox: boolean;
  file: File;
  offerID: string;
}

export interface languageInterface {
  name: string;
  to: string;
  img: string;
  color: string;
  background: string;
}

export interface mobileViewModeInterface {
  view: string;
  header: boolean;
}

export interface cityInterface {
  name: string;
  to: string;
  coordinates: { lat: number; lng: number };
}
