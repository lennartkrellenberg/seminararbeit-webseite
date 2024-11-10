import { ImageWithTextComponent } from "./ImageWithText";
import { TextWithImageComponent } from "./TextWithImage";
import { ImageTextOverlayComponent } from "./ImageTextOverlay";
import { ImageTextOverlay, ImageWithText, TextWithImage } from "@/app/types";

interface ContentRendererProps {
  content: (ImageWithText | TextWithImage | ImageTextOverlay)[];
}

export const ContentRenderer = ({ content }: ContentRendererProps) => {
  const renderComponent = (
    item: ImageWithText | TextWithImage | ImageTextOverlay
  ) => {
    console.log("Render");
    console.log(content);
    switch (item.__component) {
      case "shared.image-with-text":
        return <ImageWithTextComponent data={item} />;
      case "shared.text-with-image":
        return <TextWithImageComponent data={item} />;
      case "shared.image-text-overlay":
        return <ImageTextOverlayComponent data={item} />;
      default:
        return null;
    }
  };

  return (
    <section className="mb-16">
      {content.map((item, index) => (
        <div key={index}>{renderComponent(item)}</div>
      ))}
    </section>
  );
};
