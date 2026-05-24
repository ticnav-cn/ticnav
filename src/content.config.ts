import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const TrustLevelSchema = z.enum(['official', 'expert', 'verified_org', 'community', 'unverified']);
const LangSchema = z.enum(['zh', 'en', 'mixed']);

const meta = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/meta' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    name_en: z.string(),
    aliases: z.array(z.string()),
    icd10: z.string(),
    description: z.string(),
    prevalence: z.string(),
    onset_age: z.string(),
    last_updated: z.string(),
  }),
});

const guidelines = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/guidelines' }),
  schema: z.object({
    entries: z.array(z.object({
      title: z.string(),
      organization: z.string(),
      year: z.number(),
      lang: LangSchema,
      url: z.string(),
      trust_level: TrustLevelSchema,
      tags: z.array(z.string()).optional(),
      summary: z.string().optional(),
      has_chinese_version: z.boolean().optional(),
      chinese_version_url: z.string().optional(),
    })),
  }),
});

const medications = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/medications' }),
  schema: z.object({
    entries: z.array(z.object({
      name: z.string(),
      category: z.string(),
      indication: z.string(),
      trust_level: TrustLevelSchema,
      sources: z.array(z.object({
        label: z.string(),
        url: z.string(),
      })),
      notes: z.string().optional(),
      side_effects: z.array(z.string()).optional(),
      availability: z.array(z.string()).optional(),
    })),
  }),
});

const hospitals = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/hospitals' }),
  schema: z.object({
    entries: z.array(z.object({
      name: z.string(),
      city: z.string(),
      department: z.string(),
      specialty: z.array(z.string()),
      trust_level: TrustLevelSchema,
      has_specialty_clinic: z.boolean().optional(),
      url: z.string(),
      notes: z.string().optional(),
    })),
  }),
});

const communities = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/communities' }),
  schema: z.object({
    entries: z.array(z.object({
      name: z.string(),
      platform: z.string(),
      url: z.string(),
      trust_level: TrustLevelSchema,
      description: z.string(),
      member_count_estimate: z.string().optional(),
      caution: z.string().optional(),
    })),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/research' }),
  schema: z.object({
    entries: z.array(z.object({
      title: z.string(),
      organization: z.string(),
      url: z.string(),
      trust_level: TrustLevelSchema,
      lang: LangSchema,
      has_chinese_version: z.boolean().optional(),
      chinese_version_url: z.string().optional(),
      description: z.string(),
      year: z.number().optional(),
    })),
  }),
});

export const collections = { meta, guidelines, medications, hospitals, communities, research };
