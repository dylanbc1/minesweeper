["java:package:co.icesi.buscaminas"]
module services{
    struct Cell{
        bool isLandMine;
        int value;
        bool hide;
        bool showAll;
    }
    sequence<Cell> CellVect;
    sequence<CellVect> CellMat;

    interface BoardSerices{
        int initGame(int n, int m, int mines);
        CellMat printBoard();
        bool selectCell(int i, int j);
        void showAll(bool show);
    }
}