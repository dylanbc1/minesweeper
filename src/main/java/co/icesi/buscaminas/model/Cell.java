package co.icesi.buscaminas.model;

public class Cell {

    private boolean isLandMine;
    private int value;

    private boolean hide;

    private boolean showAll;

    public Cell(boolean isMine, int value) {
        this.isLandMine = isMine;
        this.value = value;
        hide = true;
        showAll = false;
    }

    public int getValue() {
        return value;
    }

    public void setLandMine(boolean landMine) {
        isLandMine = landMine;
    }

    public boolean isLandMine() {
        return isLandMine;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public boolean isHide() {
        return hide;
    }

    public void setHide(boolean hide) {
        this.hide = hide;
    }

    public void setShowAll(boolean showAll) {
        this.showAll = showAll;
    }

    public boolean isShowAll() {
        return showAll;
    }

    @Override
    public String toString() {

        return hide && !showAll?".":(isLandMine ?"\u001B[31m*\u001B[0m":value+"");
    }
}
