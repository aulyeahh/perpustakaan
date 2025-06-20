class Buku {
    static jumlah = 0;
    constructor(judul, penulis, kategori) {
        this.judul = judul;
        this.penulis = penulis;
        this.kategori = kategori;
        Buku.jumlah++;
        this.id = Buku.jumlah;
    }
}

class Ebook extends Buku {
    constructor(judul, penulis, kategori) {
    super(judul, penulis, kategori);
        this.format = 'Digital';
    }
}

class BukuCetak extends Buku {
    constructor(judul, penulis, kategori) {
    super(judul, penulis, kategori);
        this.format = 'Cetak';
    }
}

const daftarBuku = [];
const form = document.getElementById('book-form');
const daftarElemen = document.getElementById('book-list');
const totalElemen = document.getElementById('total-count');
const pesanError = document.getElementById('error-msg');
const inputFilterPenulis = document.getElementById('filter-author');
const inputFilterKategori = document.getElementById('filter-category');

function tampilkanBuku(bukuDisaring) {
    daftarElemen.innerHTML = '';
    bukuDisaring.forEach((buku) => {
        const div = document.createElement('div');
        div.className = 'book-item';
        div.innerHTML = `
            <strong>${buku.judul}</strong> oleh ${buku.penulis} [${buku.kategori}] - ${buku.format}
            <button data-id="${buku.id}">Hapus</button>
        `;
        daftarElemen.appendChild(div);
    });

    totalElemen.textContent = daftarBuku.length;
}

function validasi(judul, penulis, kategori) {
    if (!judul || !penulis || !kategori) {
        throw new Error('Semua kolom wajib diisi!');
    }
}

function perbaruiTampilan() {
    const cariPenulis = inputFilterPenulis.value.toLowerCase();
    const cariKategori = inputFilterKategori.value.toLowerCase();
    const hasilFilter = daftarBuku.filter((b) =>
        b.penulis.toLowerCase().includes(cariPenulis) &&
        b.kategori.toLowerCase().includes(cariKategori)
    );

    tampilkanBuku(hasilFilter);
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const judul = document.getElementById('title').value.trim();
    const penulis = document.getElementById('author').value.trim();
    const kategori = document.getElementById('category').value.trim();
    const tipe = document.getElementById('type').value;

    try {
        validasi(judul, penulis, kategori);
        let bukuBaru;
    if (tipe === 'ebook') {
        bukuBaru = new Ebook(judul, penulis, kategori);
    } else {
        bukuBaru = new BukuCetak(judul, penulis, kategori);
    }
        daftarBuku.push(bukuBaru);
        form.reset();
        pesanError.textContent = '';
        perbaruiTampilan();
    } catch (err) {
        pesanError.textContent = err.message;
    }
});

daftarElemen.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        const id = Number(e.target.getAttribute('data-id'));
        const index = daftarBuku.findIndex((b) => b.id === id);
        if (index !== -1) {
            daftarBuku.splice(index, 1);
            perbaruiTampilan();
        }
    }
});

inputFilterPenulis.addEventListener('input', perbaruiTampilan);
inputFilterKategori.addEventListener('input', perbaruiTampilan);
