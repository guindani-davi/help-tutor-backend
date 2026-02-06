export abstract class IHelpersService {
  public abstract parseEntitiesDates(
    createdAt: string,
    updatedAt: string | null,
  ): { createdAtDate: Date; updatedAtDate: Date | null };

  public abstract isProduction(): boolean;
}
