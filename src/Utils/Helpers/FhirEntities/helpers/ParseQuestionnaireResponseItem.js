

export const ParseQuestionnaireResponseBoolean = (normalizedResponse, linkId) => {
  const item = normalizedResponse.items.find(
    (i) => i.linkId === linkId,
  );
  if (typeof item === "undefined")return undefined;
  return Boolean(
    +item['answer'][0]['valueBoolean'],
  );
}
