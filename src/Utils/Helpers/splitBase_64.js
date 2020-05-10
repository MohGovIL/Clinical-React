/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param base64
 * @param {string} base64
 * @returns {{metadata: *, data: *, type: *}}
 */
export const splitBase_64 = (base64) => {
  const base_64_metadata = base64.split(',')[0];
  const base_64_data = base64.split(',')[1];
  const base_64_type = base_64_metadata.split(';')[0].split(':')[1];
  return {
    metadata: base_64_metadata,
    data: base_64_data,
    type: base_64_type,
  };
};
