export interface Bio {
    id: string;
    fullName: string;
    jobTitle: string;
    description: string;
    techStack: string[];
    mainImage: string;          // The images are in Base64-encoded image data
    optionalImage1: string;
    optionalImage2: string;
    caption1: string;
    caption2: string;
    caption3: string;
}
