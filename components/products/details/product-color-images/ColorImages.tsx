import DragDropIcon from "@/components/icons/DragDropIcon";
import { Button } from "@/components/ui/button";
import FileInput from "@/components/ui/file-input";
import FilePreview from "@/components/ui/file-input/FilePreview";
import useSessionStorage from "@/hooks/use-session-storage";
import useFetch from "@/lib/hooks/use-fetch";
import useRemoveFile from "@/lib/mutations/useRemoveFile";
import useUpload from "@/lib/mutations/useUpload";
import { IFile } from "@/lib/types";
import { TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";
import { IProduct } from "../../ListItem";
import ENDPOINTS from "@/lib/endpoints";
import useSaveColorImages from "@/lib/mutations/admin/products/useSaveColorImages";
import { useQueryClient } from "@tanstack/react-query";
interface ColorImagesProps {
  product_id: string;
}

export interface IProductFile extends IFile {
  product_color_id: string | null;
}

interface ColorImagesState {
  thumbnail?: IProductFile;
  extras?: IProductFile[];
}

const ColorImages: React.FC<ColorImagesProps> = ({ product_id }) => {
  const { data, isLoading } = useFetch<IProduct>({
    endpoint: ENDPOINTS.admin.products.fetch_single(product_id),
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useUpload();
  const { value: product_color_id } = useSessionStorage(
    `${product_id}_color_id`,
  );
  const {
    value: images,
    setValue: setImages,
    removeValue: removeImagesFromSession,
  } = useSessionStorage<ColorImagesState>(product_color_id);

  const { mutate: savingFiles, isPending: isSaving } =
    useSaveColorImages(product_color_id);
  const { mutate: removeFile, isPending: isRemoving } = useRemoveFile();

  const handleFileDelete = (id: string, type: "thumbnail" | "extras") => {
    removeFile(id);
    setImages((prev) => {
      const newImages = {
        ...(prev && prev),
        ...(type === "extras" && {
          extras: prev?.extras?.filter((file) => file.id !== id),
        }),
      };

      if (type === "thumbnail") {
        delete newImages.thumbnail;
      }

      return newImages;
    });
  };

  const handleDiscard = () => {
    const files = [];
    if (images?.thumbnail && !images?.thumbnail?.product_color_id) {
      files.push(images.thumbnail.id);
    }
    if (Array.isArray(images?.extras)) {
      files.push(
        ...images.extras
          .filter((file) => !file.product_color_id)
          .map((file) => file.id),
      );
    }

    if (files.length > 0) {
      for (const file of files) {
        removeFile(file, {
          onSuccess: (removed) => {
            setImages((prev) => {
              const newImages = {
                ...(prev && prev),
                ...(removed.fieldname === "extras" && {
                  extras: prev?.extras?.filter(
                    (file) => file.id !== removed.id,
                  ),
                }),
              };
              if (removed.fieldname === "thumbnail") {
                delete newImages.thumbnail;
              }
              return newImages;
            });
            queryClient.invalidateQueries({
              queryKey: [ENDPOINTS.admin.products.fetch_single(product_id)],
            });
          },
        });
      }
    }
  };

  const handleSave = () => {
    const files = [];
    if (images?.thumbnail && !images?.thumbnail?.product_color_id) {
      files.push(images.thumbnail.id);
    }
    if (Array.isArray(images?.extras)) {
      files.push(
        ...images.extras
          .filter((file) => !file.product_color_id)
          .map((file) => file.id),
      );
    }

    if (files.length > 0) {
      savingFiles(
        { file_ids: files },
        {
          onSuccess: () => {
            removeImagesFromSession();
            queryClient.invalidateQueries({
              queryKey: [ENDPOINTS.admin.products.fetch_single(product_id)],
            });
          },
        },
      );
    }
  };

  React.useEffect(() => {
    if (data && product_color_id) {
      const files = data.product_colors?.find(
        (color) => color.id === product_color_id,
      )?.images;
      const images: ColorImagesState = {};
      const thumbnail = files?.find((file) => file.fieldname === "thumbnail");
      const extras = files?.filter((file) => file.fieldname === "extras");

      if (thumbnail) {
        images.thumbnail = {
          id: thumbnail.id,
          url: thumbnail.url,
          fieldname: thumbnail.fieldname,
          product_color_id: thumbnail.product_color_id,
        };
      }

      if (Array.isArray(extras) && extras.length > 0) {
        images.extras = extras.map((file) => ({
          id: file.id,
          url: file.url,
          fieldname: file.fieldname,
          product_color_id: file.product_color_id,
        }));
      }

      if (Object.keys(images).length > 0) {
        setImages(images);
      }
    }
  }, [data, product_color_id]);

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        <div className="flex-shrink-0 w-52 h-52">
          <FileInput
            onChange={(files) => {
              if (
                Array.isArray(files) &&
                !isNaN(files?.length) &&
                files?.length > 0
              ) {
                mutate(
                  { file: files[0], name: "thumbnail" },
                  {
                    onSuccess: (data) => {
                      setImages((prev) => ({
                        ...(prev && prev),
                        thumbnail: {
                          id: data.id,
                          url: data.url,
                          fieldname: data.fieldname,
                          product_color_id: data.product_color_id,
                        },
                      }));
                    },
                  },
                );
              }
            }}
          >
            <FilePreview
              file={null}
              {...(images?.thumbnail?.url && {
                defaultValue: {
                  type: "image",
                  url: images?.thumbnail?.url,
                },
              })}
            >
              <div className="size-full flex flex-col justify-center items-center">
                <DragDropIcon className="size-[25px]" />
                <p className="max-w-[80%] text-center">Upload thumbnail</p>
              </div>
            </FilePreview>
          </FileInput>
        </div>
        <div className="flex-grow flex flex-wrap gap-4">
          {images?.extras?.map((image) => (
            <div
              className="w-52 h-52 border-2 overflow-hidden rounded-md grid place-content-center"
              key={image.id}
            >
              <Image
                src={image.url || ""}
                alt={`Product image`}
                width={200}
                height={150}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleFileDelete(image.id, "extras")}
              >
                <TrashIcon className="size-[25px]" />
              </Button>
            </div>
          ))}

          {(images?.extras?.length || 0) < 4 && (
            <FileInput
              onChange={(files) => {
                if (
                  Array.isArray(files) &&
                  !isNaN(files?.length) &&
                  files?.length > 0
                ) {
                  mutate(
                    { file: files[0], name: "extras" },
                    {
                      onSuccess: (data) => {
                        setImages((prev) => {
                          const newImages = {
                            ...(prev && prev),
                            extras: [
                              ...(Array.isArray(prev?.extras)
                                ? prev.extras
                                : []),
                              {
                                id: data.id,
                                fieldname: data.fieldname,
                                url: data.url,
                                product_color_id: data.product_color_id,
                              },
                            ],
                          };
                          return newImages;
                        });
                      },
                    },
                  );
                }
              }}
              className="h-52 w-52"
            >
              <FilePreview file={null} className="size-full">
                <div className="size-full flex flex-col justify-center items-center">
                  <DragDropIcon className="size-[25px]" />
                  <p className="max-w-[80%] text-center">
                    Upload extra images ( max 5 )
                  </p>
                </div>
              </FilePreview>
            </FileInput>
          )}
        </div>
      </div>
      <div className="mt-4 flex gap-4 items-center justify-end">
        <Button variant="secondary" size="lg" onClick={() => handleDiscard()}>
          Discard
        </Button>
        <Button onClick={() => handleSave()} size="lg">
          Save
        </Button>
      </div>
    </div>
  );
};

export default ColorImages;
