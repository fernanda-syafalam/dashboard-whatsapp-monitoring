'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Bots } from './columns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'; // Pastikan DialogTitle dan DialogDescription diimpor dari shadcn/ui
import { botService } from '../apis/bot-api';
import { Loader2, QrCode } from 'lucide-react'; // Icon untuk loading dan placeholder

interface Props {
  currentRow?: Bots;
  open: boolean;
  onOpenChange: (state: boolean) => void;
}

const ModalBarcode = ({ open, onOpenChange, currentRow }: Props) => {
  const [barcodeData, setBarcodeData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBarcode = async () => {
      if (!currentRow?.id) {
        setBarcodeData(null);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      setBarcodeData(null); 

      try {
        const data = await botService.getGeneratedBarcode(currentRow.id);
        setBarcodeData(data.qrCode);
      } catch (err) {
        console.error('Error fetching barcode:', err);
        setError('Gagal memuat QR Code. Pastikan ID bot benar.');
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchBarcode();
    } else {
      setBarcodeData(null);
      setError(null);
      setLoading(false);
    }
  }, [open, currentRow]); // Dependency array sudah benar

  // Cleanup untuk URL objek blob
  useEffect(() => {
    return () => {
      if (barcodeData && barcodeData.startsWith('blob:')) {
        URL.revokeObjectURL(barcodeData);
      }
    };
  }, [barcodeData]);

  const dialogTitle = currentRow?.name ? `QR Code untuk Bot: ${currentRow.name}` : 'QR Code Bot';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm p-6 sm:max-w-md"> {/* Ukuran modal sedikit lebih compact */}
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold">{dialogTitle}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Scan QR Code di bawah ini untuk memulai sesi bot.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center items-center my-6 h-[260px] w-full bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-200 dark:border-gray-700 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-2 text-sm">Memuat QR Code...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center text-center text-red-600 dark:text-red-500 p-4">
              <QrCode className="h-10 w-10 mb-2" />
              <p className="text-sm font-medium">{error}</p>
              <p className="text-xs text-muted-foreground mt-1">Coba tutup dan buka kembali modal.</p>
            </div>
          ) : barcodeData ? (
            <Image
              src={barcodeData}
              alt={`QR Code for ${currentRow?.name || 'Bot'}`}
              width={250}
              height={250}
              quality={100}
              priority
              unoptimized={barcodeData.startsWith('data:')}
              className="rounded-lg object-contain" 
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 p-4">
              <QrCode className="h-10 w-10 mb-2" />
              <p className="text-sm text-center">QR Code akan muncul di sini setelah dimuat.</p>
            </div>
          )}
        </div>
        
        <div className="text-center text-xs text-muted-foreground mt-4">
          Pastikan perangkat Anda terhubung ke internet.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBarcode;