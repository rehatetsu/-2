const fs = require('fs');

try {
  let html = fs.readFileSync('index.html', 'utf8');
  const css = fs.readFileSync('css/style.css', 'utf8');
  const js = fs.readFileSync('js/main.js', 'utf8');

  // Replace link and script tags
  html = html.replace(/<link rel="stylesheet" href="\.\/css\/style\.css">/, `<style>\n${css}\n</style>`);
  html = html.replace(/<script src="\.\/js\/main\.js" defer><\/script>/, `<script>\n${js}\n</script>`);

  // Replace images with Base64
  if (fs.existsSync('img/hero_clinic_room.png')) {
      const heroImage = fs.readFileSync('img/hero_clinic_room.png');
      const heroBase64 = `data:image/png;base64,${heroImage.toString('base64')}`;
      html = html.replace(/\.\/img\/hero_clinic_room\.png/g, heroBase64);
  }

  if (fs.existsSync('img/therapist_portrait.png')) {
      const staffImage = fs.readFileSync('img/therapist_portrait.png');
      const staffBase64 = `data:image/png;base64,${staffImage.toString('base64')}`;
      html = html.replace(/\.\/img\/therapist_portrait\.png/g, staffBase64);
  }

  fs.writeFileSync('index.html', html);
  console.log("Successfully bundled into single file index.html");
} catch(e) {
  console.error("Build failed:", e);
  process.exit(1);
}
