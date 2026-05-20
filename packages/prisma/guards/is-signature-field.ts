import { FieldType } from '@prisma/client';

const SignatureFieldTypes = [FieldType.SIGNATURE, FieldType.IMAGE_UPLOAD] as const;

type SignatureFieldType = (typeof SignatureFieldTypes)[number];

export const isSignatureFieldType = (type: FieldType): type is SignatureFieldType => {
  return type === FieldType.SIGNATURE || type === FieldType.IMAGE_UPLOAD;
};
