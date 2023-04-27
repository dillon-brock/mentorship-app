interface BaseMaterialInfo {
  subjectId: string;
  url: string;
  name: string | null;
}

export interface NewMaterial extends BaseMaterialInfo {
  type: string;
}

export interface ExistingMaterial extends BaseMaterialInfo {
  id: string;
}