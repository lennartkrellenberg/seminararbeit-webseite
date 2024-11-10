export type Team = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  };

export type Player = {
    id: string;
    name: string;
    position: string;
    image: Image;
  };

  export interface ImageWithText {
    __component: "shared.image-with-text";
    id: number;
    title: string;
    description: string;
    image: Image;
  }
  
  export interface TextWithImage {
    __component: "shared.text-with-image";
    id: number;
    title: string;
    description: string;
    image: Image;
  }
  
  export interface ImageTextOverlay {
    __component: "shared.image-text-overlay";
    id: number;
    title: string;
    description: string;
    image: Image;
  }
  
  type Format = {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path?: string;
    size: number;
    width: number;
    height: number;
  };
  
  type Formats = {
    thumbnail: Format;
    small: Format;
    medium: Format;
  };
  
  type Logo = {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: Formats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  
  export type Club = {
    id: number;
    documentId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    logo: Logo;
    description: string;
    stadium: {
      id: number;
      documentId: string;
      name: string;
      description: string;
      capacity: number;
      opening: string;
      image: Image;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      address: string;
    };

    players: Player[];
  };

  interface NavItem {
    id: number;
    name: string; // Name des Navigationspunkts
    link: string; // Ziel des Links
  }
  
  interface Image {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      thumbnail: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        path: null;
        width: number;
        height: number;
        size: number;
        sizeInBytes: number;
        url: string;
      };
      small: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        path: null;
        width: number;
        height: number;
        size: number;
        sizeInBytes: number;
        url: string;
      };
      large: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        path: null;
        width: number;
        height: number;
        size: number;
        sizeInBytes: number;
        url: string;
      };
      medium: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        path: null;
        width: number;
        height: number;
        size: number;
        sizeInBytes: number;
        url: string;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null;
    provider: string;
    provider_metadata: null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  export interface NavbarData {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    brand: string;
    items: NavItem[];
    logo: Image[];
  }


  interface SEO {
    id: number;
    metaTitle: string;
    metaDescription: string;
    shareImage: Image;
  }


export  type LandingPage = {
    seo: SEO;
    content: (ImageWithText | TextWithImage | ImageTextOverlay)[]};