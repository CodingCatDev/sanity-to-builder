export interface CodingCatBuilderContentPodcast
  extends CodingCatBuilderContent {
  data: PodcastData;
}

export interface PodcastData extends Data {
  recordingDate: number;
  episode: number;
  season: number;
}

export interface CodingCatBuilderContent {
  name: string;
  published: 'published' | 'draft' | 'archived';
  query: Query[];

  modelId?: string;
  createdDate?: number;
  data: Data;
  id?: string;
  meta?: Meta;
  startDate?: number;
  createdBy?: string;
  lastUpdated?: number;
  lastUpdatedBy?: string;
  screenshot?: string;
  testRatio?: number;
  variations?: Variations;
  firstPublished?: number;
  rev?: string;
}

export interface Data {
  cssCode?: string;
  inputs?: any[];
  page: Page;
  state: State;
  title: string;
  url: string;
  blocks: Block[];
}

export interface Page {
  authors: Author[];
  coverPhoto: CoverPhoto;
  excerpt: string;
  frameworks: any[];
  title: string;
}

export interface Author {
  _key: string;
  _ref: string;
  _type: string;
  author: Author2;
}

export interface Author2 {
  '@type': string;
  id: string;
  model: string;
}

export interface CoverPhoto {
  public_id: string;

  _key?: string;
  _type?: string;
  _version?: number;
  access_mode?: string;
  bytes?: number;
  created_at?: string;
  created_by?: CreatedBy;
  duration?: any;
  format?: string;
  height?: number;
  metadata?: Metadata;
  resource_type?: string;
  secure_url?: string;
  tags?: any[];
  type?: string;
  uploaded_by?: UploadedBy;
  url?: string;
  version?: number;
  width?: number;
}

export interface CreatedBy {
  id: string;
  type: string;
}

export interface Metadata {
  [key: string]: string;
}

export interface UploadedBy {
  id: string;
  type: string;
}

export interface State {
  deviceSize: string;
  location: Location;
}

export interface Location {
  path: string;
  query: Query;
}

export interface Query {
  '@type'?: string;
  operator?: string;
  property?: string;
  value?: string;
}

export interface Block {
  '@type': string;
  '@version'?: number;
  layerName?: string;
  id: string;
  children?: Block[];
  tagName?: string;
  properties?: Properties;
  responsiveStyles?: ResponsiveStyles;
  component?: Component;
  class?: string;
  bindings?: Bindings;
  code?: Code;
  repeat?: Repeat;
}

export interface Component {
  name: string;
  options: Options;
}

export interface Options {
  content?: string;
  url?: string;
  text?: string;
  href?: string;
  src?: string;
  layout?: string;
  height?: number;
  width?: number;
  alt?: string;
  className?: string;
  code?: string;
  scriptsClientOnly?: boolean;
  sponsors?: Sponsor[];
  title?: string;
}

export interface Bindings {
  [key: string]: string;
}

export interface Code {
  bindings: Bindings;
}

export interface Sponsor {
  company: string;
  description: string;
  url: string;
  coverPhoto: CoverPhoto;
}

export interface Repeat {
  collection: string;
}

export interface ResponsiveStyles {
  [key: string]: {
    [key: string]: string;
  };
}

export interface Properties {
  src: string;
  role: string;
  width: string;
  height: string;
}

export interface Meta {
  hasLinks: boolean;
  kind: string;
  needsHydration: boolean;
}

export interface Variations {}
