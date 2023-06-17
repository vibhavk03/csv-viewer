/* n is the column index */
function sortTable(n) {
  let table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById('file-view-table');
  switching = true;
  rows = table.rows;
  /* get the clicked table header */
  let clickedTH = rows[0].getElementsByTagName('TH')[n];
  /* Set the sorting direction */
  if (clickedTH.classList.contains('sort-asc')) {
    dir = 'asc';
  } else {
    dir = 'desc';
  }
  /* remove th-clicked class if present in any column and reset the direction icon */
  for (let a = 0; a < rows[0].children.length; a++) {
    let colm = rows[0].getElementsByTagName('TH')[a];
    if (a !== n) {
      /* for every column other than clicked column add sort-asc class */
      colm.classList.add('sort-asc');
    }
    colm.classList.remove('th-clicked');
    let dirIconDiv = colm.children[0].children[0];
    dirIconDiv.innerHTML = '';
    dirIconDiv.innerHTML = '<i class="fa-solid fa-sort"></i>';
  }
  /* Make a loop that will continue until
    no switching has been done: */
  while (switching) {
    /* Start by saying: no switching is done */
    switching = false;
    /* Loop through all table rows (except the
      first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      /* Start by saying there should be no switching */
      shouldSwitch = false;
      /* Get the two elements you want to compare,
        one from current row and one from the next: */
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];
      /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
      if (dir == 'asc') {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          /* If so, mark as a switch and break the loop: */
          shouldSwitch = true;
          break;
        }
      } else if (dir == 'desc') {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          /* If so, mark as a switch and break the loop: */
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      /* Each time a switch is done, increase this count by 1: */
      switchcount++;
    }
  }
  /* adding class to table header to change background colour */
  clickedTH.classList.add('th-clicked');
  /* changing icon based on the direction in which table is sorted */
  let dirIconDiv = document.querySelector('.th-clicked .asc-desc-icon');
  if (dir === 'asc') {
    /* remove sort-asc class so next time it sorts in desc direction */
    clickedTH.classList.remove('sort-asc');
    /* add icon to show table will sort in desc direction now */
    dirIconDiv.innerHTML = '';
    dirIconDiv.innerHTML = '<i class="fa-solid fa-sort-down"></i>';
  } else {
    /* add sort-asc class so next time it sorts in asc direction */
    clickedTH.classList.add('sort-asc');
    /* add icon to show table will sort in asc direction now */
    dirIconDiv.innerHTML = '';
    dirIconDiv.innerHTML = '<i class="fa-solid fa-sort-up"></i>';
  }
}
