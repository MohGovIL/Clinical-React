

export const ParseQuestionnaireResponseBoolean = (normalizedResponse, linkId) => {
  return Boolean(
    +normalizedResponse.items.find(
      (i) => i.linkId === linkId,
    )['answer'][0]['valueBoolean'],
  );
}
