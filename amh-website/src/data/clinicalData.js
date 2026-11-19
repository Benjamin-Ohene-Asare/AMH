
import femaleSurgical from "../assets/IMG_9669.avif";
import outpatient from "../assets/IMG_4027.avif";
import maternity from "../assets/IMG_2937.avif";
import ultrasound from "../assets/IMG_2556.avif";
import emergency from "../assets/IMG_9730.avif";
import maleSurgical from "../assets/IMG_9751.avif";
import rch from "../assets/IMG_9975.avif";
import theatre from "../assets/IMG_9362_edited.avif";
import ent from "../assets/123.avif";
import recovery from "../assets/IMG_2692.avif";
import laboratory from "../assets/IMG_9219 copy.avif";
import anc from "../assets/IMG-20230728-WA0027.avif";
import neonatal from "../assets/86d677e0-b8c9-4d6a-a980-af6bfd93ccba.avif";
import eye from "../assets/IMG_9958_edited.avif";
import pharmacy from "../assets/IMG_9715.avif";
import xray from "../assets/ChatGPT Image Feb 20, 2026, 04_50_22 PM.avif";
import anaesthesia from "../assets/IMG_2767.avif";
import dental from "../assets/IMG_2820.avif";

// Separate images used inside the department detail popups
import femaleSurgicalDetail from "../assets/IMG_9640.avif";
import maleSurgicalDetail from "../assets/IMG_9746_edited.avif";
import laboratoryDetail from "../assets/IMG_9208 (1).avif";
import outpatientDetail from "../assets/IMG_7711.avif";
import rchDetail from "../assets/IMG_2664.avif";
import ancDetail from "../assets/IMG-20230728-WA0027 (1).avif";

import maternityDetail from "../assets/IMG_2952 _edited.avif";
import emergencyDetail from "../assets/IMG_9730 (1).avif";
import theatreDetail from "../assets/IMG_9369.avif";
import entDetail from "../assets/IMG_8802_JPG.avif";
import recoveryDetail from "../assets/IMG_2692 (2).avif";
import neonatalDetail from "../assets/IMG_2839.avif";
import eyeDetail from "../assets/ChatGPT Image Jul 24, 2026, 07_10_38 PM (1).avif";
import pharmacyDetail from "../assets/ChatGPT Image Sep 22, 2026, 02_08_42 PM.avif";
import xrayDetail from "../assets/ChatGPT Image Feb 20, 2026, 04_50_22 PM (1).avif";
import anaesthesiaDetail from "../assets/IMG_2718.avif";
import dentalDetail from "../assets/IMG_2820 (1).avif";

const clinicalDepartments = [
  {
    id: 1,
    name: "Female Surgical",
    image: femaleSurgical,
    detailImage: femaleSurgicalDetail,
    overview: `Our Female Surgical Ward offers specialized care for female patients with both general and surgical needs.

Supported by a team of experienced and caring nurses, we provide a safe, comfortable, and patient-focused environment to promote recovery and well-being`,
    services: [],
  },

  {
    id: 2,
    name: "Outpatient Department",
    image: outpatient,
    detailImage: outpatientDetail,
    overview: `Our Outpatient Department provides the first point of contact for patients seeking medical care at our facility. We offer general consultations, assessment, diagnosis, and treatment for a wide range of health conditions.

With a committed team of clinicians and nurses, the OPD ensures timely care, effective triaging, and smooth patient flow, making healthcare accessible, efficient, and patient-centered.`,
    services: [],
  },

  {
    id: 3,
    name: "Maternity",
    image: maternity,
    detailImage: maternityDetail,
    overview: `Our facility’s Maternity Unit is a 15-bed capacity ward staffed by highly qualified and compassionate healthcare professionals.

We provide comprehensive maternal care, including labor and delivery, postnatal support, and newborn care, ensuring a safe and comfortable environment for mothers and their babies.

Our team is dedicated to delivering personalized care, promoting healthy pregnancies, and supporting positive birth experiences`,
    services: [],
  },

  {
    id: 4,
    name: "Ultrasound",
    image: ultrasound,
    overview: "",
    services: [],
  },

  {
    id: 5,
    name: "Emergency",
    image: emergency,
    detailImage: emergencyDetail,
    overview: `Our Emergency Unit provides prompt and effective care for patients experiencing urgent and life-threatening conditions.

Staffed by a skilled team of clinicians and nurses, the unit is equipped to handle a wide range of emergencies.

We are committed to delivering timely, patient-centered care to stabilize, treat, and support patients during critical moments`,
    services: [],
  },

  {
    id: 6,
    name: "Male Surgical",
    image: maleSurgical,
    detailImage: maleSurgicalDetail,
    overview: `Our Male Surgical Ward is a 9-bed capacity unit dedicated to the care of male patients requiring both general and surgical management. Staffed by a skilled team of nurses, the ward provides comprehensive, patient-centered care, ensuring safety, comfort, and high-quality clinical outcomes for all admitted patients`,
    services: [],
  },

  {
    id: 7,
    name: "Reproductive and Child Health (RCH)",
    image: rch,
    detailImage: rchDetail,
    overview: `The Reproductive and Child Health Unit provides essential services that support the wellbeing of women, children, and families.

The unit offers child welfare services, immunizations, family planning, nutrition education, and health promotion activities.

With a dedicated team of skilled professionals, the RCH Unit ensures safe, accessible, and patient-centered care that promotes healthy children, and healthy families within our community`,
    services: [],
  },

  {
    id: 8,
    name: "Theatre",
    image: theatre,
    detailImage: theatreDetail,
    overview: `Our facility has a modern, well-maintained, and fully equipped theatre environment, designed to provide safe and efficient surgical care.

With two theatres available, our skilled team of professionals performs a wide range of procedures while ensuring every patient feels comfortable, confident, and cared for throughout their surgical experience`,
    services: [],
  },

  {
    id: 9,
    name: "ENT",
    image: ent,
    detailImage: entDetail,
    overview: `Our ENT Unit provides care for patients with ear, nose, and throat conditions. We offer consultations, basic diagnostic services, and treatments to help improve hearing, breathing, and overall comfort.

Our skilled team ensures safe and patient-centered care for everyone`,
    services: [],
  },

  {
    id: 10,
    name: "Recovery",
    image: recovery,
    detailImage: recoveryDetail,
    overview: `Our Recovery Unit is a well-equipped and well-maintained space dedicated to providing post-procedure and post-surgery care for patients.

Staffed by a skilled and compassionate team, the unit ensures that every patient receives close monitoring, comfort, and `,
    services: [],
  },

  {
    id: 11,
    name: "Laboratory",
    image: laboratory,
    detailImage: laboratoryDetail,
    overview: `Our Laboratory provides accurate and timely diagnostic services to support effective patient care. We conduct a wide range of tests, including hematology, biochemistry, urinalysis, and other essential investigations.

With skilled laboratory professionals and reliable equipment, we ensure safe sample handling and dependable results to guide clinical decision-making and improve patient outcomes.`,
    services: [],
  },

  {
    id: 12,
    name: "Antenatal Care (ANC)",
    image: anc,
    detailImage: ancDetail,
    overview: `We provide personalized antenatal care to guide expectant mothers through every stage of pregnancy. Our services include thorough medical assessments, lifestyle and nutritional counselling, and proactive monitoring to identify and manage any risks early.

We are committed to supporting the health and well-being of both mother and baby, ensuring a safe, positive, and well-prepared pregnancy journey`,
    services: [],
  },

  {
    id: 13,
    name: "Neonatal and Intensive Care Unit (NICU)",
    image: neonatal,
    detailImage: neonatalDetail,
    overview: `Our Neonatal Intensive Care Unit (NICU) provides specialized, round-the-clock care for newborns who require close monitoring or advanced medical support.

Equipped with modern neonatal technology and staffed by skilled and compassionate professionals, the NICU offers a safe and nurturing environment for premature babies, low-birth-weight infants, and newborns with medical challenges.`,
    services: [],
  },

  {
    id: 14,
    name: "Eye",
    image: eye,
    detailImage: eyeDetail,
    overview: `Our newly opened Eye Unit provides basic eye care services to support the vision and eye health of our patients.

The unit offers eye examinations, diagnosis of common eye conditions, and basic treatments. We are committed to promoting healthy vision and ensuring patients receive attentive, patient-centered care in a welcoming environment.`,
    services: [],
  },

  {
    id: 15,
    name: "Pharmacy",
    image: pharmacy,
    detailImage: pharmacyDetail,
    overview: `Our Pharmacy Unit provides safe, reliable, and timely dispensing of medications to support patient care across the facility`,
    services: [],
  },

  {
    id: 16,
    name: "X-Ray",
    image: xray,
    detailImage: xrayDetail,
    overview: `Our Diagnostic and Imaging Services provide accurate and timely tests to support effective patient care. We offer a range of services, including X-rays, ECGs, and various scans, all conducted using modern equipment and performed by skilled professionals.

These services help in the early detection, diagnosis, and monitoring of medical conditions, ensuring patients receive the right care at the right time`,
    services: [],
  },

  {
    id: 17,
    name: "Anaesthesia",
    image: anaesthesia,
    detailImage: anaesthesiaDetail,
    overview: `Our Anaesthesia Unit is dedicated to ensuring safe, pain-free, and comfortable surgical experiences for all patients. Led by skilled professionals, we provide pre-operative assessment, continuous monitoring during procedures, and post-operative care to support quick and smooth recovery. Patient safety and comfort remain our top priority at every stage.`,
    services: [],
  },

  {
    id: 18,
    name: "Dental",
    image: dental,
    detailImage: dentalDetail,
    overview: `Our Dental Unit provides comprehensive oral health care in a safe and comfortable environment. We offer preventive, diagnostic, and treatment services, including routine check-ups, cleanings, fillings, and minor procedures. Our team is committed to promoting healthy smiles through quality care and patient education.`,
    services: [],
  },
];

export default clinicalDepartments;
