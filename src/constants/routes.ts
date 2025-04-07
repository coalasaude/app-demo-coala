import { institutionTabEnum } from '@/v3/presentation/pages/organizations/pages/view/institution/components/constant/institutionTabEnum'

export const ROUTES: Record<string, Record<string, string>> = {
  MODULES: {
    ADMIN: '/admin',
    MANAGER: '/manager',
    MEDICAL: '/medical',
    STUDENT: '/student',
    INSTITUTION: '/institution',
    COLABORATOR: '/colaborator',
    APP: '/app',
  },
}

export const MODULES: Partial<Record<string, string>> = {
  ADMIN: '/admin',
  MEDICAL: '/medical',
  SURVEY: '/survey',
  STUDENT: '/student',
  INSTITUTION: '/institution',
}

export const PUBLIC_ROUTES = {
  LINK: '/link',
  CERTIFICATE: '/certificate/[id]',
}

export const AUTHENTICATED_ROUTES = {
  USERS: '/users',
  SEND_PHONE_TOKEN: '/send-phone-token',
  FILL_DATA: '/fill-required-data',
  SEND_CERTIFIED: '/send-certified',
  NETWORKS: '/networks',
  INSTITUTIONS: '/institutions',
  APPOINTMENT: '/appointment',
  HEALTH_HISTORIC: '/health-historic',
  DASHBOARD: '/dashboard',
  WITHOUT_PERMISSION: '/without-permission',
  NOTIFICATION: '/notification',
  MEDICAL_EXPENSE: '/medical-expense',
  REGISTRATION: '/registration',
  DOCUMENT: '/document',
  NUTRITION: '/nutrition',
  PSYCHOLOGY: '/psychology',
  MATERIALS: '/materials',
  COURSE: '/courses',
  SCHEDULED_MEDICINE: '/scheduled-medicine',
  HELLO: '/hello',
  PLAN: '/plan',
  SURVEY: '/survey',
  PROFILES: '/profiles',
  PLAN_PERMISSION: '/subscription-permission',
  END_REGISTER: '/end-register',
  ACCESS: '/access',
  PROFESSIONAL_REFERENCE: '/professional-reference',
  HEALTH_INSURANCE: '/health-insurance',
  PAYMENT: '/pagamento',
  SUBSCRIPTION: '/subscription',
  DEPENDENT: '/dependent',
  CHANGE_PASSWORD: '/change-password',
  INDICATION: '/indication',
  MENTAL_HEALTH: '/mental-health',
  HEALTH_UNIT: '/health-unit',
  ORGANIZATION: '/organizations',
  FORUM: '/forum',
  REPORTS: '/forms/reports',
  IEP: '/forms/iep',
  MEDIATION: '/forms/mediation',
  HEALTH_ASSESSMENT: '/forms/health-assessment',
  ANXIETY: '/forms/anxiety',
  DEPRESSION: '/forms/depression',
  AUTISM: '/forms/autism',
  THERAPY: '/forms/therapy',
  PORTAGE: '/forms/portage',
  NPS: '/forms/nps',
  OCCUPATIONAL_HEALTH: '/forms/occupational-health',
  COMPLAINTS: '/forms/complaints',
  IA: '/ia',
}

export const UNAUTHENTICATED_ROUTES = {
  LOGIN_ACCESS: '/',
  LOGIN: '/login',
  ACCESS: '/access',
  ACTIVATION: '/activation',
  DOCUMENT: '/document',
  RECOVERY_PASSWORD: '/recovery-password',
  PAYMENT: '/pagamento',
  SUBSCRIPTION: '/subscription',
  TRIAL: '/trial',
  FILE_VIEW: '/file-view',
  FORM_REGISTRATION: '/form-registration',
}

export const subRoutes = {
  ADD: '/add',
  EDIT: '/edit',
  VIEW: '/view',

  DOCUMENT: {
    VIEW_PRESCRIPTION: '/prescription',
    REGISTER: '/register',
  },

  USERS: {
    ADD_ROLE: '/add-role',
    HEALTH_HISTORY: '/health-historic',
    ADD_RESPONSABLE: '/add-responsable',
  },

  ACCESS: {
    AUTHENTICATE: '/authenticate',
    VERIFY_ACCESS: '/verify-access',
    CREATE_PASSWORD: '/create-password',
    SEND_ACCESS: '/send-access',
    END_REGISTER: '/end-register',
  },

  TRIAL: {
    REGISTER: '/register',
    CREATE_PASSWORD: '/create-password',
  },

  SEND_PHONE_TOKEN: {
    VERIFY_PHONE_TOKEN: '/verify-phone-token',
  },

  APPOINTMENT: {
    PRESCRIPTION: '/prescription',
    EXAM: '/exam',
    SICK_NOTE: '/sick-note',
    MEDICAL_RECORD: '/medical-record',
    REPORT: '/report',
    SCHEDULED_APPOINTMENT: '/scheduled',
    INSTITUTIONAL_REPORT: '/scheduled',
    ATTACHMENTS: '/attachments',
    CALL: '/call',
    EDIT: '/edit',
    URGENCY: '/urgency',
    PROGRESS: '/progress',
    CID: '/cid',
    DETAILS: '/details',
  },

  NETWORKS: {
    ASSOCIATE_INSTITUTION: '/associate-institution',
  },

  HEALTH_HISTORIC: {
    GENERAL_DATA: '/general-data',
    VACCINE: '/vaccine',
    VACCINE_COMPROVANT: '/vaccine-comprovant',
    VACCINE_DOSAGE: '/vaccine-dosage',
    DISEASES: '/diseases',
    MEDICINE: '/medicine',
    ALLERGY: '/allergy',
    MEASURE: '/measure',
    SICK_NOTE: '/sick-note',
    SURGERY: '/surgery',
    APPOINTMENT: '/appointment',
    SUCCESS: '/success',
    PRESCRIPTION: '/prescription',
    FIRST_FILLS: '/first-access',
  },

  RECOVERY_PASSWORD: {
    VERIFY_EMAIL_TOKEN: '/verify',
  },

  SCHEDULED: {
    MEDICINE: '/scheduled-medicine',
  },

  MATERIALS: {
    GUIDANCE_LETTERS: '/guidance-letters',
    MENTAL_HEALTH_LETTERS: '/mental-health',
    CLINIC: '/clinic',
    MANUALS: '/manuals',
    SCHOOL_NUTRITION: '/school-nutrition',
    SCHOOL_PSYCHOLOGY: '/school-psychology',
    EBOOKS: '/ebook',
    GUIDES: '/guides',
    PROTOCOLS: '/protocols',
  },

  SURVEY: {
    VERIFY: '/verify',
    ALREADY_FILLED: '/already-filled',
  },

  INDICATION: {
    SEND: '/send',
  },

  SUBSCRIPTION: {
    FEEDBACK: '/feedback',
  },

  MENTAL_HEALTH: {
    path: '/app/mental-health',
    name: 'Saúde mental',
    CREATE: { path: '/app/mental-health/create', name: 'Criar' },
    REGISTER: { path: '/app/mental-health/register', name: 'Cadastrar' },
  },

  HEALTH_UNIT: {
    path: '/app/health-unit',
    name: 'Unidades de saúde',
    REGISTER: { path: '/app/health-unit/create', name: 'Criar' },
  },

  FORUM: {
    path: '/app/forum',
    name: 'Fórum',
    SOON: { path: '/app/forum/soon', name: 'Em Breve' },
  },
}

export const NEW_ROUTES = {
  AUTHENTICATED: {
    APPOINTMENT: {
      path: '/app/appointment',
      name: 'Atendimento',
      VIEW: { path: '/app/appointment/[id]', name: 'Visualizar' },
      LIST: { path: '/app/appointment/list', name: 'Fila de atendimentos' },
      ADD: { path: '/app/appointment/add/urgency', name: 'Chamar ajuda' },
      RETROACTIVE: {
        path: '/app/appointment/add/retroactive',
        name: 'Solicitar atendimento retroativo',
      },
      PRESCRIPTION: { path: '/app/appointment/[id]/prescription', name: 'Prescrição' },
      ATTACHMENT: { path: '/app/appointment/[id]/attachment', name: 'Anexo' },
      DIAGNOSE: {
        path: '/app/appointment/[appointmentId]/diagnose/[id]',
        name: 'Diagnóstico',
      },
      EXAM: { path: '/app/appointment/[id]/exam', name: 'Exame' },
      SICK_NOTE: { path: '/app/appointment/[id]/sick-note', name: 'Atestado' },
      MEDICAL_RECORD: { path: '/app/appointment/[id]/medical-record', name: 'Registros médicos' },
      REPORT: { path: '/app/appointment/[id]/report', name: 'Relatórios' },
      SCHEDULED_APPOINTMENT: {
        path: '/app/appointment/scheduled',
        name: 'Agendamentos',
        VIEW: {
          path: '/app/appointment/[id]/scheduled',
          name: 'Agendamentos',
        },
        REPORT: {
          path: '/app/appointment/[id]/scheduled/report',
          name: 'Relatório de Agendamento',
        },
        ADD: { path: '/app/appointment/scheduled/add', name: 'Agendar atendimento' },
      },
      FOLLOW_UP: {
        path: '/app/appointment/[id]/follow-up',
        name: 'Acompanhamento',
        VIEW: {
          path: '/app/appointment/[appointmentId]/follow-up/[followUpId]',
          name: 'Acompanhamento',
        },
        ADD: { path: '/app/appointment/follow-up/add', name: 'Adicionar acompanhamento' },
      },
      INSTITUTIONAL_REPORT: { path: '/app/appointment/[id]/scheduled', name: 'Agendamentos' },
      ATTACHMENTS: { path: '/app/appointment/[id]/attachments', name: 'Anexos' },
      CALL: { path: '/app/appointment/[id]/call', name: 'Videochamada' },
      EDIT: { path: '/app/appointment/[id]/edit', name: 'Edição' },
      PROGRESS: { path: '/app/appointment/[id]/progress', name: 'Progresso' },
      CID: { path: '/app/appointment/[id]/cid', name: 'Código CID' },
      DETAILS: { path: '/app/appointment/[id]/details', name: 'Detalhes' },
      FINISHED: { path: '/app/appointment/[id]/finished', name: 'Finalizar atendimento' },
    },
    FORMS: {
      path: '/app/forms',
      name: 'Formulários',
      NPS: { path: '/app/forms/nps', name: 'NPS' },
    },
    HEALTH_HISTORY: {
      path: '/app/users/[userId]/health-historic',
      name: 'Ficha de saúde',
      VIEW: { path: '/app/health-historic/[id]', name: 'Ficha de saúde' },
      ACCESS: { path: '/app/users/access/health-historic', name: 'Acesso' },
      GENERAL_DATA: { path: '/app/health-historic/general-data', name: 'Informações gerais' },
      VACCINE: {
        path: '/app/health-historic/vaccine',
        name: 'Vacinas',
        ADD: { path: '/app/health-historic/vaccine/[id]/add' },
        VIEW: { path: '/app/health-historic/vaccine/[id]' },
      },
      VACCINE_COMPROVANT: {
        path: '/app/health-historic/vaccine-comprovant',
        name: 'Comprovante de Vacinas',
        ADD: { path: '/app/health-historic/vaccine-comprovant/add' },
        VIEW: { path: '/app/health-historic/vaccine-comprovant/[id]' },
      },
      DISEASES: {
        path: '/app/health-historic/diseases',
        name: 'Doenças',
        ADD: { path: '/app/health-historic/diseases/add' },
        VIEW: { path: '/app/health-historic/diseases/[id]' },
      },
      MEDICINE: {
        path: '/app/health-historic/medicine',
        name: 'Medicamentos',
        ADD: { path: '/app/health-historic/medicine/add' },
        VIEW: { path: '/app/health-historic/medicine/[id]' },
      },
      ALLERGY: {
        path: '/app/health-historic/allergy',
        name: 'Alergias',
        ADD: { path: '/app/health-historic/allergy/add' },
        VIEW: { path: '/app/health-historic/allergy/[id]' },
      },
      MEASURE: {
        path: '/app/health-historic/measure',
        name: 'Medidas',
        ADD: { path: '/app/health-historic/measure/add' },
        VIEW: { path: '/app/health-historic/measure/[id]' },
      },
      SICK_NOTE: {
        path: '/app/health-historic/sick-note',
        name: 'Atestados',
        ADD: { path: '/app/health-historic/sick-note/add' },
        VIEW: { path: '/app/health-historic/sick-note/[id]' },
      },
      SURGERY: {
        path: '/app/health-historic/surgery',
        name: 'Cirurgias',
        ADD: { path: '/app/health-historic/surgery/add' },
        VIEW: { path: '/app/health-historic/surgery/[id]' },
      },
      APPOINTMENT: {
        path: '/app/health-historic/appointment',
        name: 'Atendimentos',
        ADD: { path: '/app/health-historic/appointment/add' },
        VIEW: { path: '/app/health-historic/appointment/[id]' },
      },
    },
    USERS: {
      path: '/app/users',
      name: 'Usuários',
      LIST: {
        path: '/app/users/list',
        name: 'Listagem de usuários',
      },
      PROFILES: {
        path: '/app/users/profiles',
        name: 'Perfis de acesso',

        ADD: {
          path: '/app/users/profiles/add',
          name: 'Adicionar Perfil',
        },

        VIEW: {
          path: '/app/users/profiles/[id]',
          name: 'Visualizar Perfil',
        },
      },
      ACCESS: {
        path: '/app/users/access',
        HEALTH_HISTORIC: {
          path: '/app/users/access/health-historic',
          name: 'Ficha de saúde',
        },
      },
      VIEW: {
        path: '/app/users/[userId]/[[...section]]',
        bindPath: '/app/users/[userId]',
        name: 'Visualizar',
      },
      FIRST_FILLS: {
        path: '/app/users/[userId]/first-access',
        name: 'Visualizar',
      },
      ADD: {
        path: '/app/users/add',
        name: 'Cadastrar',
        PROFESSIONAL: {
          path: '/app/users/[userId]/add/professional-reference',
          name: 'Adicionar profissional de saúde',
        },
        HEALTH_INSURANCE: {
          path: '/app/users/[userId]/add/health-insurance',
          name: 'Cadastro de convênio',
        },
        PROFILE: { path: '/app/users/[userId]/add/profile', name: 'Adicionar perfil' },
        DEPENDENT: {
          path: '/app/users/[userId]/add/dependent',
          name: 'Adicionar dependente',
        },
        RESPONSIBLE: {
          path: '/app/users/[userId]/add/responsible',
          name: 'Adicionar responsável',
        },
      },
      EDIT: {
        GENERAL_DATA: {
          path: '/app/users/[userId]/edit/general-data',
          name: 'Editar dados gerais',
        },
        PERSONAL_DATA: {
          path: '/app/users/[userId]/edit/personal-data',
          name: 'Editar dados pessoais',
          PASSWORD: {
            path: '/app/users/[userId]/edit/personal-data/password',
            name: 'Validar senha',
          },
        },
        LOGIN_DATA: {
          path: '/app/users/[userId]/edit/login-data',
          name: 'Editar dados pessoais',
          PASSWORD: {
            path: '/app/users/[userId]/edit/login-data/password',
            name: 'Validar senha',
          },
        },
        ADDRESS: { path: '/app/users/[userId]/edit/address', name: 'Editar endereço' },
        CHANGE_PASSWORD: { path: '/app/users/[userId]/change-password', name: 'Alterar senha' },
        CHANGE_TELEPHONE: {
          path: '/app/users/[userId]/edit/change-telephone',
          name: 'Alterar telefone',
          TOKEN: {
            path: '/app/users/[userId]/edit/change-telephone/token',
            name: 'Editar dados de login',
          },
          PASSWORD: {
            path: '/app/users/[userId]/edit/change-telephone/password',
            name: 'Validar senha',
          },
        },
        CHANGE_EMAIL: {
          path: '/app/users/[userId]/edit/change-email',
          name: 'Alterar e-mail',
          TOKEN: {
            path: '/app/users/[userId]/edit/change-email/token',
            name: 'Editar dados de login',
          },
          PASSWORD: {
            path: '/app/users/[userId]/edit/change-email/password',
            name: 'Validar senha',
          },
        },
        PROFILE: {
          path: '/app/users/[userId]/edit/profile/[userProfileId]',
          name: 'Editar perfil',
        },
      },
      HEALTH_HISTORIC: {
        path: '/app/users/[userId]/health-historic',
        FIRST_FILLS: {
          path: '/app/users/[userId]/health-historic/first-access',
          name: 'Primeiro acesso',
        },
        ALLERGY: {
          ADD: {
            path: '/app/users/[userId]/health-historic/allergy/add',
            name: 'Cadastro de alergia',
          },
        },
        DISEASES: {
          ADD: {
            path: '/app/users/[userId]/health-historic/diseases/add',
            name: 'Cadastro de doença',
          },
          EDIT: {
            path: '/app/users/[userId]/health-historic/diseases/[id]/edit',
            name: 'Editar doença',
          },
        },
        VACCINE: {
          ADD: {
            path: '/app/users/[userId]/health-historic/vaccine/add',
            name: 'Cadastro de vacina',
          },
          EDIT: {
            path: '/app/users/[userId]/health-historic/vaccine/[id]/edit',
            name: 'Editar vacina',
          },
          VIEW: {
            path: '/app/users/[userId]/health-historic/vaccine/[id]/view',
            name: 'Visualizar vacina',
          },
        },
        MEDICINE: {
          ADD: {
            path: '/app/users/[userId]/health-historic/medicine/add/prescription',
            name: 'Cadastro de medicamento',
          },
          EDIT: {
            path: '/app/users/[userId]/health-historic/medicine/[id]/edit',
            name: 'Editar medicamento',
          },
          VIEW: {
            path: '/app/users/[userId]/health-historic/medicine/[id]/view',
            name: 'Visualizar medicamento',
          },
        },
        SICK_NOTE: {
          ADD: {
            path: '/app/users/[userId]/health-historic/sick-note/add',
            name: 'Cadastro de atestado',
          },
          VIEW: {
            path: '/app/users/[userId]/health-historic/sick-note/[id]/view',
            name: 'Visualizar atestado',
          },
        },
      },
      PROFILE: { path: '/app/users/[userId]/profile', name: 'Perfil' },
      APPOINTMENT: { path: '/app/users/[userId]/appointment', name: 'Atendimento' },
      RESPONSIBLE: { path: '/app/users/[userId]/responsible', name: 'Responsáveis' },
      DEPENDENT: { path: '/app/users/[userId]/dependent', name: 'Dependentes' },
      LEARNING: { path: '/app/users/[userId]/learning', name: 'Aprendizagem' },
    },
    SEND_PHONE_TOKEN: { path: '/app/send-phone-token' },
    FILL_DATA: { path: '/app/fill-required-data', name: 'Dados obrigatórios' },
    SEND_CERTIFIED: { path: '/app/send-certified', name: 'Enviar certificado' },
    NETWORKS: { path: '/app/networks', name: 'Redes' },
    INSTITUTIONS: {
      path: '/app/institutions',
      name: 'Instituições',
      VIEW: { path: '/app/institutions/[id]', name: 'Visualizar' },
    },
    DASHBOARD: { path: '/app/dashboard', name: 'Dashboard' },
    WITHOUT_PERMISSION: { path: '/app/without-permission' },
    NOTIFICATION: { path: '/app/notification', name: 'Notificações' },
    MEDICAL_EXPENSE: { path: '/app/medical-expense', name: 'Despesas médicas' },
    REGISTRATION: { path: '/app/registration', name: 'Registros' },
    DOCUMENT: { path: '/app/document', name: 'Documentos' },
    NUTRITION: { path: '/app/nutrition', name: 'Nutrição' },
    PSYCHOLOGY: { path: '/app/psychology', name: 'Psicologia' },
    MATERIALS: {
      path: '/app/materials',
      name: 'Materiais',
      GUIDANCE_LETTERS: {
        path: '/app/materials/guidance-letters',
        name: 'Cartilhas de orientação',
      },
      EBOOKS: { path: '/app/materials/ebook', name: 'E-books' },
      MANUALS: { path: '/app/materials/manuals', name: 'Manuais' },
      PROTOCOLS: { path: '/app/materials/protocols', name: 'Protocolos' },
      SCHOOL_NUTRITION: { path: '/app/materials/school-nutrition', name: 'Nutrição escolar' },
      SCHOOL_PSYCHOLOGY: { path: '/app/materials/school-psychology', name: 'Psicologia escolar' },
      VIEW: { path: '/app/materials/view', name: 'Visualizar' },
    },
    IA: {
      path: '/app/ia',
      name: 'Assistentes de IA',
    },
    COURSE: {
      path: '/app/courses',
      name: 'Cursos',
      VIEW: { path: '/app/courses/[id]', name: 'Nome do curso' },
      MODULES: { path: '/app/courses/[id]/modules/', name: 'Módulos' },
      QUIZ: { path: '/app/courses/[id]/modules/[moduleId]/quiz', name: 'Quiz' },
      CLASS: { path: '/app/courses/[id]/class/[classId]', name: 'Aula' },
      FINAL_TEST: { path: '/app/courses/[id]/final-test', name: 'Prova' },
      SETTINGS: { path: '/app/courses/settings/[id]', name: 'Configurações' },
      CREATE: { path: '/app/courses/create', name: 'Criar curso' },
    },
    SCHEDULED_MEDICINE: { path: '/app/scheduled-medicine' },
    HELLO: { path: '/app/hello', name: '' },
    PLAN: { path: '/app/plan', name: 'Planos' },
    SURVEY: {
      path: '/survey/[surveyId]/answer/[answerId]',
    },
    PLAN_PERMISSION: { path: '/app/subscription-permission', name: 'Permissões de assinatura' },
    END_REGISTER: { path: '/app/end-register', name: 'Finalizar registro' },
    PROFESSIONAL_REFERENCE: {
      path: '/app/professional-reference',
      name: 'Profissional de referência',
    },
    MENTAL_HEALTH: {
      path: '/app/mental-health',
      name: 'Saúde mental',
      BANNER: {
        SCHEDULE: {
          path: '/app/mental-health/banner/schedule',
          name: 'Agendamento',
        },
        THERAPY: {
          path: '/app/mental-health/banner/therapy',
          name: 'Terapia',
        },
        THERAPY_COLLABORATOR: {
          path: '/app/mental-health/banner/therapy-collaborator',
          name: 'Terapia',
        },
      },
      CREATE: { path: '/app/mental-health/create', name: 'Criar' },
      SESSION: { path: '/app/mental-health/session/[id]', name: 'Agendamento' },
      CREATE_RECORD: {
        path: '/app/mental-health/session/[id]/create-record',
        name: 'Criar Registro',
      },
      RECORD: {
        path: '/app/mental-health/session/[id]/[recordId]',
        name: 'Registro',
      },
    },
    HEALTH_INSURANCE: { path: '/app/health-insurance', name: 'Convênios' },
    PAYMENT: { path: '/app/pagamento', name: 'Pagamento' },
    SUBSCRIPTION: { path: '/app/subscription', name: 'Assinaturas' },
    DEPENDENT: { path: '/app/dependent', name: 'Dependentes' },
    CHANGE_PASSWORD: { path: '/app/change-password', name: 'Mudar senha' },
    INDICATION: { path: '/app/indication', name: 'Indicações' },
    HEALTH_UNIT: {
      path: '/app/health-unit',
      name: 'Unidades de saúde',

      VIEW: {
        path: '/app/health-unit/[id]',
        name: 'Visualizar',
      },

      CREATE: {
        path: '/app/health-unit/create',
        name: 'Adicionar',
      },

      EDIT: {
        path: '/app/health-unit/[id]/edit',
        name: 'Editar',
      },
    },
    ORGANIZATION: {
      path: '/app/organizations',
      name: 'Organizações',

      ADD: {
        path: '/app/organizations/add',
        name: 'Adicionar',
      },

      EDIT: {
        path: '/app/organizations/[id]/[type]/edit',
        name: 'Editar',
      },

      INSTITUTION: {
        path: '/app/organizations/institution/[id]',
        name: 'Visualizar',

        REPORTS: {
          path: `/app/organizations/institution/[id]?tab=${institutionTabEnum.LINK_TAB}`,
          name: 'Vincular',
        },

        IMPORT_TAB: {
          path: `/app/organizations/institution/[id]?tab=${institutionTabEnum.IMPORT_TAB}`,
          name: 'Importações',
        },

        LINK: {
          path: '/link',
          name: 'Vincular',
        },

        IMPORT: {
          path: '/import',
          name: 'Importar',
        },
      },
      NETWORK: { path: '/app/organizations/network/[id]', name: 'Visualizar' },
      BRAND: { path: '/app/organizations/brand/[id]', name: 'Visualizar' },
    },
    FILE_VIEW: { path: '/app/file-view', name: 'Visualizar arquivos' },
    FORUM: {
      path: '/app/forum',
      name: 'Fórum',
      SOON: { path: '/app/forum/soon', name: 'Em Breve' },
    },
  },
  UNAUTHENTICATED: {
    LOGIN: { path: '/', name: 'Login' },
    ACTIVATION: { path: '/activation', name: 'Autenticar' },
    REGISTRATION: {
      path: '/user-registration',
      name: 'Cadastro',
      FORM: { path: '/user-registration/form', name: 'Formulário' },
      COMPLETE: { path: '/user-registration/complete', name: 'Finalizado' },
    },
  },
  API: {
    FILE_PROXY: { path: '/api/file-proxy', name: 'Baixar arquivos' },
  },
}
