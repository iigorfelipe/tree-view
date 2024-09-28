import { ChangeEvent, useState } from 'react';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  };

  const img_size = 'flex mobile:w-full min-h-[226px] laptop:w-[936px] laptop:h-[290px]';

  if (selectedImage) {
    return (
      <div className={img_size}>
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Imagem Selecionada"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${img_size} flex-col items-center justify-center border border-dashed border-primary rounded-s bg-[#55a7ff34] cursor-pointer rounded-md`}
      onClick={handleClick}
    >
      <img src="./add-image.svg" alt="add image" />
      <span className="flex items-center font-semibold text-base text-primary">
        Adicionar imagem do Ativo
      </span>
      <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
    </div>
  );
};

export default ImageUploader;
