import util from '../../src/lib/util';

const datos = { id_notario: 1, llaves: ['{"maestra": "hgNmTB6m+53M4LaiGzuve4TIsyEoUm9WhAI51dDrsdwtJ69QTTM7MP4HBPl+K9RGPvJUjSjKN1otmm5WswJBSI1c4w38h\\/bpywAw04QR+QhaZnx601VsjgQhgOPc8NLdOoy2Wv7Eo7nn3QuPNh41ebt6oOAYHLF7cWZbTr42tBm8GmymFPRviL+Oe1LDAOJm07+hY+N5skI3O+YHRbZg2GM4Hua95wr7VAzvb1Jk5ybhIAHcTG13xCf9YMaMqA6TCWP5jKlCmIt3BJaG4pl4oU1XI\\/n7llu8Vgevw1nTiKBQsrc7p\\/yL3C0jIhxxsSurwrdXOMisfkg3qOccZcfJ4w==\", "notariado": "swiC+\\/wriq2c4pRdhDcb2fPCedlTjGCGohlZxpCY8c4bcJAlMWv2hQwjgldloRSpI3j\\/Y2kCV0gfeMF8uI+ADzSgDg4YTw0UQQyGu+XUMd9o2ni6kFuC0o9+AyGXlZx5mYCivbYrBfSzeMMzQZTuadyeZp3jwgUkn3140dxgjLWq3+99YtBnUcFMvbN2rtyQSfwJmMEsy3bWJfiS+yUhTNO2T6Jh3ObsLgzz2RcN4KGdoWBOB68cWCtF8Hguk\\/smDb56mFwcurBVxQ+kCzCNUdDLLUorD61gRs5eX+0x288lYXPAha+i\\/AZyrf+9pf3VGCq+wbGEGkcN+1NzQ3tPRg==", "notario": "y1a6ddnmVVgC9UarhRRTpmHVfMa3M5o8fCLW5mVImLuY0Nol61yVrjFgS8Fzb2BQvaAamIKvZs5E0TKC+RkOfgHehCNgan8Qbn9y4M8QIhDlB1l5Gm8lNcHOrWIlopTvLV3CX0oCkV+7z\\/Z5jymssUKqg1+Ru\\/aI0Iq3jGyQFcZdH0g15T8SSo+IxOQhaAm7Io7TT7fLAMAkY1C+o4NKeH3pq8wlVKwij0GpRojUtr3XzRvzK6q3NcWYiZAlTjUOqJwfF0OwNfalOBL70Kxj9iBDI+pdSKeFgB\\/FrQXPJn8kOO3CWCx3mBHaMumFmO1Wn4TZ1waKK0wY9UCH8Tp3xg==" }'] };
const datos2 = { llaves: ['{"maestra": "hgNmTB6m+53M4LaiGzuve4TIsyEoUm9WhAI51dDrsdwtJ69QTTM7MP4HBPl+K9RGPvJUjSjKN1otmm5WswJBSI1c4w38h\\/bpywAw04QR+QhaZnx601VsjgQhgOPc8NLdOoy2Wv7Eo7nn3QuPNh41ebt6oOAYHLF7cWZbTr42tBm8GmymFPRviL+Oe1LDAOJm07+hY+N5skI3O+YHRbZg2GM4Hua95wr7VAzvb1Jk5ybhIAHcTG13xCf9YMaMqA6TCWP5jKlCmIt3BJaG4pl4oU1XI\\/n7llu8Vgevw1nTiKBQsrc7p\\/yL3C0jIhxxsSurwrdXOMisfkg3qOccZcfJ4w==\", "notariado": "swiC+\\/wriq2c4pRdhDcb2fPCedlTjGCGohlZxpCY8c4bcJAlMWv2hQwjgldloRSpI3j\\/Y2kCV0gfeMF8uI+ADzSgDg4YTw0UQQyGu+XUMd9o2ni6kFuC0o9+AyGXlZx5mYCivbYrBfSzeMMzQZTuadyeZp3jwgUkn3140dxgjLWq3+99YtBnUcFMvbN2rtyQSfwJmMEsy3bWJfiS+yUhTNO2T6Jh3ObsLgzz2RcN4KGdoWBOB68cWCtF8Hguk\\/smDb56mFwcurBVxQ+kCzCNUdDLLUorD61gRs5eX+0x288lYXPAha+i\\/AZyrf+9pf3VGCq+wbGEGkcN+1NzQ3tPRg==", "notario": "y1a6ddnmVVgC9UarhRRTpmHVfMa3M5o8fCLW5mVImLuY0Nol61yVrjFgS8Fzb2BQvaAamIKvZs5E0TKC+RkOfgHehCNgan8Qbn9y4M8QIhDlB1l5Gm8lNcHOrWIlopTvLV3CX0oCkV+7z\\/Z5jymssUKqg1+Ru\\/aI0Iq3jGyQFcZdH0g15T8SSo+IxOQhaAm7Io7TT7fLAMAkY1C+o4NKeH3pq8wlVKwij0GpRojUtr3XzRvzK6q3NcWYiZAlTjUOqJwfF0OwNfalOBL70Kxj9iBDI+pdSKeFgB\\/FrQXPJn8kOO3CWCx3mBHaMumFmO1Wn4TZ1waKK0wY9UCH8Tp3xg=="}'] };

describe('Prueba de Util', () => {
  before((done) => {
    done();
  });

  describe('verificación de construcción de array de claves', () => {
    it('debe devolver array con datos armados para guardar a base de datos', (done) => {
      util.construyeArrayClaves(datos)
        .then((resul) => {
          expect(resul).to.be.an('Array');
        })
        .catch((error) => {
          done(error);
        });
      done();
    });
    it('debe devolver mensaje con error en caso de que no ingresen los dos parámetros', (done) => {
      util.construyeArrayClaves(datos2)
        .then(() => {
          done();
        })
        .catch((error) => {
          expect(error.message).to.equal('Debe ingresar los dos parámetros.');
        });

      done();
    });
  });
  after(() => {
  });
});
