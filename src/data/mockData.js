import toyotaImage from '../images/toyota.png';
import bmwImage from '../images/bmw.png';
import mercedesImage from '../images/mercedes.png';
import audiImage from '../images/audi.png';
import hyundaiImage from '../images/hyundai.png';
import volkswagenImage from '../images/volkswagen.png';
import nissanImage from '../images/nissan.png';
import renaultImage from '../images/renault.png';

export const mockData = {
  brands: [
    { id: 1, name: 'Toyota', icon: toyotaImage, isImage: true },
    { id: 2, name: 'BMW', icon: bmwImage, isImage: true  },
    { id: 3, name: 'Mercedes', icon: mercedesImage, isImage: true },
    { id: 4, name: 'Audi', icon: audiImage, isImage: true },
    { id: 5, name: 'hyundai', icon: hyundaiImage, isImage: true },
    { id: 7, name: 'Volkswagen', icon: volkswagenImage, isImage: true },
    { id: 9, name: 'Nissan', icon: nissanImage, isImage: true },
    { id: 10, name: 'Renault', icon: renaultImage, isImage: true },
    { id: 1, name: 'Toyota', icon: toyotaImage, isImage: true },
    { id: 2, name: 'BMW', icon: bmwImage, isImage: true  },
    { id: 3, name: 'Mercedes', icon: mercedesImage, isImage: true },
    { id: 4, name: 'Audi', icon: audiImage, isImage: true },
    { id: 5, name: 'hyundai', icon: hyundaiImage, isImage: true },
    { id: 7, name: 'Volkswagen', icon: volkswagenImage, isImage: true },
    { id: 9, name: 'Nissan', icon: nissanImage, isImage: true },
    { id: 10, name: 'Renault', icon: renaultImage, isImage: true },
    { id: 3, name: 'Mercedes', icon: mercedesImage, isImage: true },
    { id: 4, name: 'Audi', icon: audiImage, isImage: true },
    { id: 5, name: 'hyundai', icon: hyundaiImage, isImage: true },
    { id: 7, name: 'Volkswagen', icon: volkswagenImage, isImage: true },
    { id: 9, name: 'Nissan', icon: nissanImage, isImage: true },
    { id: 10, name: 'Renault', icon: renaultImage, isImage: true },
  ],
  models: {
    1: ['Camry', 'Corolla', 'RAV4', 'Prius', 'Highlander', "test"], // Toyota
    2: ['3 Series', '5 Series', 'X3', 'X5', 'i3'], // BMW
    3: ['C-Class', 'E-Class', 'S-Class', 'GLE', 'GLC'], // Mercedes
    4: ['A4', 'A6', 'Q5', 'Q7', 'TT'], // Audi
    5: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey'], // Honda
    6: ['F-150', 'Mustang', 'Explorer', 'Focus', 'Escape'], // Ford
    7: ['Golf', 'Passat', 'Tiguan', 'Jetta', 'Atlas'], // Volkswagen
    8: ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Maxima'], // Nissan
    9: ['Camry', 'Corolla', 'RAV4', 'Prius', 'Highlander'], // Toyota
    10: ['3 Series', '5 Series', 'X3', 'X5', 'i3'], // BMW


  },
  years: Array.from({ length: 20 }, (_, i) => 2024 - i)
};
