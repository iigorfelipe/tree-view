import { useTheme } from '../contexts/theme';
import { useTreeStore } from '../store';
import { SvgArrow } from '../utils/arrow-up-down';
import { StatusIcon } from '../utils/status-icon';
import { IconButton } from './iconButton';
import ImageUploader from './upload-image';

type InfoDetailsProps = {
  label: string;
  value: string;
  icon?: string;
};

export const InfoDetails = ({ label, value, icon }: InfoDetailsProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-md tablet:text-lg font-semibold">{label}</span>
      <div className="flex gap-3 items-center">
        {icon &&
          (icon === 'responsible' ? (
            <span className="bg-primary rounded-full w-6 h-6 flex items-center justify-center text-light text-sm">
              {value.charAt(0).toUpperCase()}
            </span>
          ) : (
            <img src={icon} alt={`${label}-icon`} />
          ))}
        <span className="opacity-65 text-sm tablet:text-md">{value}</span>
      </div>
    </div>
  );
};

export const ComponentDetails = () => {
  const { componentSelected, setComponentSelected } = useTreeStore();
  const { theme, isSmDown } = useTheme();

  if (!componentSelected) return null;

  const borderColor = theme === 'light' ? 'border-border_light' : 'border-border_dark';

  return (
    <div className={`flex flex-col border ${borderColor} rounded-md`}>
      <header className={`flex h-12 px-5 border-b ${borderColor} items-center gap-3`}>
        {isSmDown && (
          <IconButton onClick={() => setComponentSelected(undefined)} icon={<SvgArrow direction="left" />} />
        )}

        <span className="text-lg font-semibold">{componentSelected.name}</span>
        <StatusIcon componentSelected={componentSelected} />
      </header>

      <div className="flex p-6 w-full">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row gap-5 w-full">
            <ImageUploader />

            <div className="flex sm:flex-col justify-center gap-6 w-full">
              <InfoDetails label="Tipo de Equipamento" value="Motor Elétrico (Trifásico)" />
              <div className={`border-b ${borderColor}`} />
              <InfoDetails
                label="Responsáveis"
                value={componentSelected.sensorType === 'energy' ? 'Elétrica' : 'Mecânica'}
                icon="responsible"
              />
            </div>
          </div>

          <div className={`border-b ${borderColor} w-full`} />

          <div className="flex w-full">
            <InfoDetails label="Sensor" value={componentSelected.sensorId!} icon="sign.svg" />
            <InfoDetails label="Receptor" value={componentSelected.gatewayId!} icon="modem.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};
