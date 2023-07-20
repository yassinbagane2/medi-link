const multer = require('multer');
const path = require('path');


const fileConfigs = {
  profilePicture: {
    destination: 'assets/profile-pictures/',
    allowedTypes: /jpeg|jpg|png/,
    maxFileSize: 1024 * 1024 * 5,
  },
  buildingpictures: {
    destination: 'assets/building-pictures/',
    allowedTypes: /jpeg|jpg|png/,
    maxFileSize: 1024 * 1024 * 5,
  },
  radiographie: {
    destination: 'assets/dossier-medical/radiographie/',
    allowedTypes: /jpeg|jpg|png|pdf|doc|docx|xls|xlsx/,
    maxFileSize: 1024 * 1024 * 10,
  },
  lab: {
    destination: 'assets/dossier-medical/labresult/',
    allowedTypes: /jpeg|jpg|png|pdf|doc|docx|xls|xlsx/,
    maxFileSize: 1024 * 1024 * 10,
  },
  feedbacks: {
    destination: 'assets/feedbacks/',
    allowedTypes: /jpeg|jpg|png/,
    maxFileSize: 1024 * 1024 * 5,
  },
  surgerie: {
    destination: 'assets/dossier-medical/syrgerie/',
    allowedTypes: /jpeg|jpg|png|pdf|doc|docx|xls|xlsx/,
    maxFileSize: 1024 * 1024 * 10,
  },
  provider_verififcation: {
    destination: 'assets/veriffiaction/provider-verififcation',
    allowedTypes: /jpeg|jpg|png|pdf|doc|docx|xls|xlsx/,
    maxFileSize: 1024 * 1024 * 10,
  },
  education_verififcation: {
    destination: 'assets/veriffiaction/education-verififcation',
    allowedTypes: /jpeg|jpg|png|pdf|doc|docx|xls|xlsx/,
    maxFileSize: 1024 * 1024 * 10,
  },
  experience_verififcation: {
    destination: 'assets/veriffiaction/experience-verififcation',
    allowedTypes: /jpeg|jpg|png|pdf|doc|docx|xls|xlsx/,
    maxFileSize: 1024 * 1024 * 10,
  },
  conversationFiles: {
    destination: 'assets/veriffiaction/experience-verififcation',
    allowedTypes: /jpeg|jpg|png|pdf|doc|docx|xls|xlsx/,
    maxFileSize: 1024 * 1024 * 10,
  },

};


const createStorageAndFilter = (config) => {
  return {
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, config.destination);
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    }),
    fileFilter: function (req, file, cb) {
      const isAllowed = config.allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      if (isAllowed) {
        cb(null, true);
      } else {
        cb(
          new Error('Invalid file type. Only the allowed types are accepted.'),
          false
        );
      }
    },
  };
};

const storagesAndFilters = {
  profilePicture: createStorageAndFilter(fileConfigs.profilePicture),
  radiographie: createStorageAndFilter(fileConfigs.radiographie),
  feedbacks: createStorageAndFilter(fileConfigs.feedbacks),
  buildingpictures: createStorageAndFilter(fileConfigs.buildingpictures),
  surgerie: createStorageAndFilter(fileConfigs.surgerie),
  provider_verififcation: createStorageAndFilter(fileConfigs.provider_verififcation),
  education_verififcation: createStorageAndFilter(fileConfigs.education_verififcation),
  lab: createStorageAndFilter(fileConfigs.lab),
  experience_verififcation: createStorageAndFilter(fileConfigs.experience_verififcation),
  conversationFiles: createStorageAndFilter(fileConfigs.conversationFiles),

};


const upload = {
  profilePicture: multer({
    storage: storagesAndFilters.profilePicture.storage,
    limits: {
      fileSize: fileConfigs.profilePicture.maxFileSize,
    },
    fileFilter: storagesAndFilters.profilePicture.fileFilter,
  }),
  buildingpictures: multer({
    storage: storagesAndFilters.buildingpictures.storage,
    limits: {
      fileSize: fileConfigs.buildingpictures.maxFileSize,
    },
    fileFilter: storagesAndFilters.buildingpictures.fileFilter,
  }),
  radiographie: multer({
    storage: storagesAndFilters.radiographie.storage,
    limits: {
      fileSize: fileConfigs.radiographie.maxFileSize,
    },
    fileFilter: storagesAndFilters.radiographie.fileFilter,
  }),
  feedbacks: multer({
    storage: storagesAndFilters.feedbacks.storage,
    limits: {
      fileSize: fileConfigs.feedbacks.maxFileSize,
    },
    fileFilter: storagesAndFilters.feedbacks.fileFilter,
  }),
  surgerie: multer({
    storage: storagesAndFilters.surgerie.storage,
    limits: {
      fileSize: fileConfigs.surgerie.maxFileSize,
    },
    fileFilter: storagesAndFilters.surgerie.fileFilter,
  }),
  provider_verififcation: multer({
    storage: storagesAndFilters.provider_verififcation.storage,
    limits: {
      fileSize: fileConfigs.provider_verififcation.maxFileSize,
    },
    fileFilter: storagesAndFilters.provider_verififcation.fileFilter,
  }),
  education_verififcation: multer({
    storage: storagesAndFilters.education_verififcation.storage,
    limits: {
      fileSize: fileConfigs.education_verififcation.maxFileSize,
    },
    fileFilter: storagesAndFilters.education_verififcation.fileFilter,
  }),
  experience_verififcation: multer({
    storage: storagesAndFilters.experience_verififcation.storage,
    limits: {
      fileSize: fileConfigs.experience_verififcation.maxFileSize,
    },
    fileFilter: storagesAndFilters.experience_verififcation.fileFilter,
  }),
  lab: multer({
    storage: storagesAndFilters.lab.storage,
    limits: {
      fileSize: fileConfigs.lab.maxFileSize,
    },
    fileFilter: storagesAndFilters.lab.fileFilter,
  }),
  conversationFiles: multer({
    storage: storagesAndFilters.conversationFiles.storage,
    limits: {
      fileSize: fileConfigs.conversationFiles.maxFileSize,
    },
    fileFilter: storagesAndFilters.conversationFiles.fileFilter,
  })
};

module.exports = upload;