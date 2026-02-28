'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, ImageIcon, X } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  voiceOptions,
  voiceCategories,
  MAX_FILE_SIZE,
  ACCEPTED_PDF_TYPES,
  ACCEPTED_IMAGE_TYPES,
} from '@/lib/constants';
import LoadingOverlay from '@/components/LoadingOverlay';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  pdfFile: z
    .instanceof(File, { message: 'PDF file is required' })
    .refine((file) => file.size <= MAX_FILE_SIZE, 'File size must be under 50MB')
    .refine(
      (file) => ACCEPTED_PDF_TYPES.includes(file.type),
      'Only PDF files are accepted'
    ),
  coverImage: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 10 * 1024 * 1024,
      'Image must be under 10MB'
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only JPEG, PNG, and WebP images are accepted'
    ),
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author name is required'),
  voice: z.enum(['dave', 'daniel', 'chris', 'rachel', 'sarah']),
});

type FormValues = z.infer<typeof formSchema>;

const UploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pdfFile: undefined as unknown as File,
      coverImage: undefined,
      title: '',
      author: '',
      voice: 'rachel',
    },
  });

  const pdfFile = form.watch('pdfFile');
  const coverImage = form.watch('coverImage');

  const handlePdfDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      form.setValue('pdfFile', file, { shouldValidate: true });
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) form.setValue('pdfFile', file, { shouldValidate: true });
  };

  const handleCoverDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      form.setValue('coverImage', file, { shouldValidate: true });
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) form.setValue('coverImage', file, { shouldValidate: true });
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement actual book synthesis API call
      console.log('Form submitted:', values);
      await new Promise((r) => setTimeout(r, 2000)); // Simulate API call
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="new-book-wrapper space-y-8"
        >
          {/* PDF File Upload */}
          <FormField
            control={form.control}
            name="pdfFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">PDF File</FormLabel>
                <FormControl>
                  <div
                    className={cn(
                      'upload-dropzone',
                      pdfFile && 'upload-dropzone-uploaded border-[var(--accent-warm)]'
                    )}
                    onClick={() => pdfInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handlePdfDrop}
                  >
                    <input
                      ref={pdfInputRef}
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={handlePdfChange}
                    />
                    {pdfFile ? (
                      <div className="flex flex-col items-center gap-2">
                        <span className="upload-dropzone-text font-medium">
                          {pdfFile.name}
                        </span>
                        <button
                          type="button"
                          className="upload-dropzone-remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            form.setValue('pdfFile', undefined as unknown as File);
                            pdfInputRef.current && (pdfInputRef.current.value = '');
                          }}
                          aria-label="Remove file"
                        >
                          <X className="size-5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="upload-dropzone-icon" />
                        <span className="upload-dropzone-text">
                          Click to upload PDF
                        </span>
                        <span className="upload-dropzone-hint">
                          PDF file (max 50MB)
                        </span>
                      </>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover Image Upload */}
          <FormField
            control={form.control}
            name="coverImage"
            render={() => (
              <FormItem>
                <FormLabel className="form-label">Cover Image</FormLabel>
                <FormControl>
                  <div
                    className={cn(
                      'upload-dropzone',
                      coverImage && 'upload-dropzone-uploaded border-[var(--accent-warm)]'
                    )}
                    onClick={() => coverInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleCoverDrop}
                  >
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept={ACCEPTED_IMAGE_TYPES.join(',')}
                      className="hidden"
                      onChange={handleCoverChange}
                    />
                    {coverImage ? (
                      <div className="flex flex-col items-center gap-2">
                        <span className="upload-dropzone-text font-medium">
                          {coverImage.name}
                        </span>
                        <button
                          type="button"
                          className="upload-dropzone-remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            form.setValue('coverImage', undefined);
                            coverInputRef.current && (coverInputRef.current.value = '');
                          }}
                          aria-label="Remove file"
                        >
                          <X className="size-5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="upload-dropzone-icon" />
                        <span className="upload-dropzone-text">
                          Click to upload cover image
                        </span>
                        <span className="upload-dropzone-hint">
                          Leave empty to auto-generate from PDF
                        </span>
                      </>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title Input */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Title</FormLabel>
                <FormControl>
                  <Input
                    className="form-input h-12 border border-[var(--border-subtle)]"
                    placeholder="ex: Rich Dad Poor Dad"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author Input */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Author Name</FormLabel>
                <FormControl>
                  <Input
                    className="form-input h-12 border border-[var(--border-subtle)]"
                    placeholder="ex: Robert Kiyosaki"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Voice Selector */}
          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">
                        Male Voices
                      </p>
                      <div className="voice-selector-options flex flex-wrap gap-4">
                        {voiceCategories.male.map((key) => {
                          const voice = voiceOptions[key as keyof typeof voiceOptions];
                          return (
                            <div
                              key={key}
                              className={cn(
                                'voice-selector-option flex-1 min-w-[140px]',
                                field.value === key
                                  ? 'voice-selector-option-selected'
                                  : 'voice-selector-option-default'
                              )}
                              onClick={() => field.onChange(key)}
                              onKeyDown={(e) =>
                                e.key === 'Enter' && field.onChange(key)
                              }
                              role="button"
                              tabIndex={0}
                            >
                              <div className="flex flex-col items-start gap-0.5">
                                <span className="font-semibold text-[var(--text-primary)]">
                                  {voice.name}
                                </span>
                                <span className="text-sm text-[var(--text-secondary)]">
                                  {voice.description}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">
                        Female Voices
                      </p>
                      <div className="voice-selector-options flex flex-wrap gap-4">
                        {voiceCategories.female.map((key) => {
                          const voice = voiceOptions[key as keyof typeof voiceOptions];
                          return (
                            <div
                              key={key}
                              className={cn(
                                'voice-selector-option flex-1 min-w-[140px]',
                                field.value === key
                                  ? 'voice-selector-option-selected'
                                  : 'voice-selector-option-default'
                              )}
                              onClick={() => field.onChange(key)}
                              onKeyDown={(e) =>
                                e.key === 'Enter' && field.onChange(key)
                              }
                              role="button"
                              tabIndex={0}
                            >
                              <div className="flex flex-col items-start gap-0.5">
                                <span className="font-semibold text-[var(--text-primary)]">
                                  {voice.name}
                                </span>
                                <span className="text-sm text-[var(--text-secondary)]">
                                  {voice.description}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="form-btn disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Begin Synthesis
          </button>
        </form>
      </Form>

      {isSubmitting && <LoadingOverlay />}
    </>
  );
};

export default UploadForm;
