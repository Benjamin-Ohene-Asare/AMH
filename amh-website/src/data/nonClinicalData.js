
import medicalStores from "../assets/m1.avif";
import medicalRecords from "../assets/m2.avif";
import administration from "../assets/m3.avif";
import environmentTeam from "../assets/m4.avif";
import accounts from "../assets/m5.avif";

const nonClinicalData = [
  {
    id: 1,
    name: "Medical Stores",
    image: medicalStores,
    overview: `The Medical Stores Department manages the safe storage and distribution of both drug and non-drug supplies needed for quality healthcare delivery.

The unit ensures that medications, medical consumables, and essential equipment are well-organized, properly stored, and readily available to support all clinical and administrative departments.

Through careful inventory management and adherence to standards, the team helps maintain a consistent and reliable supply chain for the facility.`,
  },

  {
    id: 2,
    name: "Medical Records",
    image: medicalRecords,
    overview: `Our Medical Records Unit oversees the organization and retrieval of patient information to support efficient and effective healthcare delivery.

By maintaining complete and reliable patient information, the unit plays a vital role in enabling timely diagnoses, treatment decisions, and overall quality care.`,
  },

  {
    id: 3,
    name: "Administration",
    image: administration,
    overview: `Our Medical Records Unit oversees the organization and retrieval of patient information to support efficient and effective healthcare delivery.

By maintaining complete and reliable patient information, the unit plays a vital role in enabling timely diagnoses, treatment decisions, and overall quality care.`,
  },

  {
    id: 4,
    name: "Environment Team",
    image: environmentTeam,
    overview: `Our Environment Team plays a vital role in keeping the facility safe, welcoming, and hygienic. Made up of dedicated orderlies and labourers, they ensure all areas are thoroughly cleaned and well-maintained, following strict standards and regulations.

By creating a spotless and organized environment, they help protect the health of patients and staff, and provide a comfortable, reassuring space for everyone who visits our facility.`,
  },

  {
    id: 5,
    name: "Accounts",
    image: accounts,
    overview: `The Accounts Department is responsible for the effective management and control of the hospital’s financial resources. The department ensures accurate billing, proper recording of financial transactions, revenue management, budgeting, and financial reporting.

Working closely with other departments, the Accounts Department supports the hospital’s operations by ensuring that payments, receipts, claims, and other financial transactions are properly processed and accounted for.

Our commitment is to maintain transparency, accountability, accuracy, and financial integrity while providing patients, staff, suppliers, and other stakeholders with efficient and professional financial services.`,
  },
];

export default nonClinicalData;
