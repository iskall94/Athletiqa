export function mapAthleteFromApi(dto) {
    return {
        publicProfileId: dto.publicProfileId,
        name: dto.name,
        sport: dto.sport ?? "",
        photoUrl: dto.photoUrl ?? "",
        gender: dto.gender,
    };
}