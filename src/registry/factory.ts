import { SectionDefinition } from "@/types/site";

/**
 * Fábrica tipada para criação de seções Plug-and-Play.
 * Garante que qualquer novo bloco siga estritamente o contrato de 3 camadas:
 * 1. Layout (gerido pelo SectionWrapper)
 * 2. Styles (gerido pelo SectionWrapper + overrides finos)
 * 3. Content (validado pelo Zod e exposto para o /admin do cliente)
 */
export function createSection<TContent = Record<string, any>>(
  definition: SectionDefinition<TContent>
): SectionDefinition<TContent> {
  return definition;
}
