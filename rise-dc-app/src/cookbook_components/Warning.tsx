import ErrorIcon from '@mui/icons-material/Error';

type WarningProps = {
  label: string;
};

const Warning = ({ label }: WarningProps) => {
  return (
    <div className="px-8 py-4 bg-white border border-black flex items-center justify-center">
      <ErrorIcon className='mr-4'></ErrorIcon>
      <span className="text-black text-xl">{label}</span>
    </div>
  );
};

export default Warning;
