import { formatDateWithTime } from '@/lib/utils';

import { Input } from './ui/input';
import { Label } from './ui/label';

interface Props {
  entity: any;
}

export const UpdatedFields = ({ entity }: Props) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>Creado el</Label>
        <Input
          type="text"
          disabled
          value={formatDateWithTime(entity.createdAt)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>Actualizado el</Label>
        <Input
          type="text"
          disabled
          value={formatDateWithTime(entity.updatedAt)}
        />
      </div>
    </div>
  );
};
