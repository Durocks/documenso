import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@documenso/ui/primitives/form/form';
import { Input } from '@documenso/ui/primitives/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trans } from '@lingui/react/macro';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ZFreeSignatureFormSchema = z.object({
  customText: z.string().optional(),
  textAlign: z.enum(['left', 'center', 'right']).optional(),
});

type TFreeSignatureFormSchema = z.infer<typeof ZFreeSignatureFormSchema>;

type EditorFieldFreeSignatureFormProps = {
  customText: string | null;
  textAlign: string | undefined;
  onCustomTextChange: (value: string) => void;
  onTextAlignChange: (value: string) => void;
};

import { EditorGenericTextAlignField } from './editor-field-generic-field-forms';

export const EditorFieldFreeSignatureForm = ({
  customText,
  textAlign,
  onCustomTextChange,
  onTextAlignChange,
}: EditorFieldFreeSignatureFormProps) => {
  const form = useForm<TFreeSignatureFormSchema>({
    resolver: zodResolver(ZFreeSignatureFormSchema),
    mode: 'onChange',
    defaultValues: {
      customText: customText || '',
      textAlign: textAlign,
    },
  });

  const { control } = form;

  useEffect(() => {
    const subscription = form.watch((value) => {
      onCustomTextChange(value.customText || '');
      if (value.textAlign) {
        onTextAlignChange(value.textAlign);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onCustomTextChange, onTextAlignChange]);

  return (
    <Form {...form}>
      <form>
        <fieldset className="flex flex-col gap-2">
          <FormField
            control={control}
            name="customText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Trans>Custom Name</Trans>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Seal" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="textAlign"
            render={() => (
              <FormItem>
                <EditorGenericTextAlignField formControl={control} label="Alignment" />
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
      </form>
    </Form>
  );
};
