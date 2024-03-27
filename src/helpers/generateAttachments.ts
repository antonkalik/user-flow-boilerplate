import path from 'path';
import { Extension } from 'src/@types/enums';

type AttachmentFile = {
  name: string;
  ext?: Extension;
  cid?: string;
};

export const generateAttachments = (files: AttachmentFile[] = []) =>
  files.map(file => {
    const ext = file.ext || Extension.png;
    const filename = `${file.name}.${ext}`;
    const imagePath = path.join(__dirname, '..', 'src/assets', filename);
    return {
      filename,
      path: imagePath,
      cid: file.cid || file.name,
    };
  });
