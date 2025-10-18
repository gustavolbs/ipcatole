"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

export type ImageSchema = {
  link: string;
  description: string;
  _id: string;
};

export const GalleryFeed = ({ feed }: { feed: ImageSchema[] }) => {
  const [selected, setSelected] = useState<ImageSchema | null>(null);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  const handlePressStart = (item: ImageSchema) => {
    pressTimer.current = setTimeout(() => {
      setSelected(item);
    }, 400); // tempo para "clicar e segurar"
  };

  const handlePressEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  return (
    <section>
      <h2 className="text-3xl font-bold">Galeria</h2>
      <small className="mb-6">Segure uma das imagens para expandi-la</small>

      {/* layout original mantido */}
      <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-6 gap-4 mt-6">
        {feed.map((item) => (
          <div
            key={item._id}
            onMouseDown={() => handlePressStart(item)}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={() => handlePressStart(item)}
            onTouchEnd={handlePressEnd}
            className="group relative aspect-square bg-muted rounded-lg overflow-hidden shadow-card hover:shadow-elegant transition-all cursor-pointer max-w-[300px] mx-auto"
          >
            <Image
              src={item.link}
              alt={item.description}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              width={300}
              height={300}
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white font-medium text-center px-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal com animação */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <AnimatePresence>
          {selected && (
            <DialogContent className="[&>button]:hidden outline-none bg-transparent border-none shadow-none flex items-center justify-center">
              <motion.div
                key={selected._id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 18 }}
                className="relative w-[100vw] h-auto sm:max-w-[90vw] sm:max-h-[80vh] flex items-center justify-center aspect-square"
              >
                <Image
                  src={selected.link}
                  alt={selected.description}
                  fill
                  className="object-contain rounded-2xl sm:rounded-xl"
                />
                <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-center bg-black/60 px-3 py-1 rounded-md text-sm backdrop-blur-sm">
                  {selected.description}
                </p>
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </section>
  );
};
